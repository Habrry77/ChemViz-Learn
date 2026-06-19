/**
 * 化学物质转化关系学习网站 - 主脚本
 */

// 全局变量
let currentElement = 'fe';
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let zoomLevel = 1;
let lastFocusedInput = null; // 保存最后聚焦的输入框

// DOM辅助函数
const $ = id => document.getElementById(id);

// 初始化
function init() {
    setupEvents();
    renderDiagram('fe');
    renderKnowledgeDetail();
    renderOrganic();
    loadQuestion(0);
}

// 设置事件监听
function setupEvents() {
    // 导航标签切换
    document.querySelectorAll('.nav-tab').forEach(t => {
        t.addEventListener('click', () => switchTab(t.dataset.tab));
    });

    // 移动端导航
    document.querySelectorAll('.mobile-nav-btn').forEach(b => {
        b.addEventListener('click', () => {
            switchTab(b.dataset.tab);
            document.querySelectorAll('.mobile-nav-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
        });
    });

    // 元素卡片点击
    document.querySelectorAll('.element-card').forEach(c => {
        c.addEventListener('click', () => {
            const el = c.dataset.element;
            document.querySelectorAll('.element-card').forEach(x => x.classList.remove('active'));
            c.classList.add('active');
            
            if (el === 'organic') {
                switchTab('organic');
            } else {
                switchTab('diagram');
                currentElement = el;
                renderDiagram(el);
            }
            
            if (window.innerWidth <= 1024) {
                $('sidebar').classList.remove('open');
            }
        });
    });

    // 移动端菜单
    $('mobileMenuBtn').addEventListener('click', () => {
        $('sidebar').classList.toggle('open');
    });

    // 重置视图
    $('resetViewBtn').addEventListener('click', resetView);

    // 快捷键提示
    $('shortcutsBtn').addEventListener('click', () => {
        $('shortcutsHint').classList.toggle('show');
    });

    // 缩放控制
    $('zoomInBtn').addEventListener('click', () => changeZoom(0.2));
    $('zoomOutBtn').addEventListener('click', () => changeZoom(-0.2));

    // 模态框
    $('modalClose').addEventListener('click', closeModal);
    $('modalOverlay').addEventListener('click', e => {
        if (e.target === $('modalOverlay')) closeModal();
    });

    // 练习提交
    $('submitBtn').addEventListener('click', submitAnswer);
    $('nextQuestionBtn').addEventListener('click', nextQuestion);

    // 下标快捷输入按钮
    document.querySelectorAll('.subscript-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const char = btn.dataset.char;
            if (lastFocusedInput) {
                const start = lastFocusedInput.selectionStart || lastFocusedInput.value.length;
                const end = lastFocusedInput.selectionEnd || lastFocusedInput.value.length;
                const value = lastFocusedInput.value;
                lastFocusedInput.value = value.substring(0, start) + char + value.substring(end);
                lastFocusedInput.selectionStart = lastFocusedInput.selectionEnd = start + char.length;
                lastFocusedInput.focus();
            }
        });
    });

    // 监听输入框聚焦
    document.addEventListener('focusin', e => {
        if (e.target.classList.contains('fill-input') || e.target.classList.contains('infer-input')) {
            lastFocusedInput = e.target;
        }
    });

    // 窗口大小改变时重新渲染图谱
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderDiagram(currentElement);
        }, 250);
    });
    
    // 移动端元素选择栏
    document.querySelectorAll('.mobile-element-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const el = btn.dataset.element;
            document.querySelectorAll('.mobile-element-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentElement = el;
            renderDiagram(el);
        });
    });

    // 滚轮缩放
    $('diagramCanvas').addEventListener('wheel', e => {
        e.preventDefault();
        changeZoom(e.deltaY > 0 ? -0.1 : 0.1);
    });
}

// 切换标签页
function switchTab(tab) {
    document.querySelectorAll('.section-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    $(tab + 'Section').classList.add('active');
    document.querySelector(`.nav-tab[data-tab="${tab}"]`).classList.add('active');
}

// 渲染转化图谱
function renderDiagram(el) {
    const data = chemistryData[el];
    if (!data) return;

    $('diagramTitle').textContent = data.title;
    $('knowledgeContent').innerHTML = data.knowledge;

    // 清除现有内容
    $('diagramCanvas').querySelectorAll('.substance-node, .reaction-label').forEach(e => e.remove());
    $('svgArrows').querySelectorAll('line').forEach(e => e.remove());
    clearAnimation();

    const canvas = $('diagramCanvas');
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.32;
    const nodes = data.nodes;
    const nodePositions = {};

    // 创建环形布局的节点
    nodes.forEach((n, i) => {
        const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        nodePositions[n.id] = { x, y };

        const div = document.createElement('div');
        div.className = `substance-node ${n.type}`;
        div.textContent = n.formula;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.transform = 'translate(-50%, -50%)';
        div.dataset.nodeId = n.id;
        div.addEventListener('click', () => {
            showModal(n.name, n.formula, data.reactions.filter(r => r.from === n.id || r.to === n.id));
        });
        canvas.appendChild(div);
    });

    // 创建反应箭头和标签
    data.reactions.forEach(rx => {
        const fn = data.nodes.find(n => n.id === rx.from);
        const tn = data.nodes.find(n => n.id === rx.to);
        if (!fn || !tn) return;

        const fnPos = nodePositions[rx.from];
        const tnPos = nodePositions[rx.to];
        if (!fnPos || !tnPos) return;

        const x1 = fnPos.x, y1 = fnPos.y;
        const x2 = tnPos.x, y2 = tnPos.y;

        // 创建SVG箭头线
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'arrow-line');
        $('svgArrows').appendChild(line);

        // 创建反应条件标签
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const label = document.createElement('div');
        label.className = 'reaction-label';
        label.textContent = rx.label;
        label.style.left = `${mx}px`;
        label.style.top = `${my}px`;
        label.style.transform = 'translate(-50%, -50%)';
        label.addEventListener('click', () => {
            const fromNode = canvas.querySelector(`[data-node-id="${rx.from}"]`);
            const toNode = canvas.querySelector(`[data-node-id="${rx.to}"]`);
            playAnimation(rx, fromNode, toNode);
        });
        canvas.appendChild(label);
    });
}

// 清除动画
function clearAnimation() {
    $('animationBox').classList.remove('active');
    $('beaker').querySelectorAll('.molecule, .bubble').forEach(m => m.remove());
    $('beakerInner').style.height = '0';
    $('beakerInner').classList.remove('heating');
    $('conditionDisplay').classList.remove('show');
    $('conditionDisplay').textContent = '';
    $('phenomenonDisplay').classList.remove('show');
    $('phenomenonDisplay').textContent = '';
    $('flame').classList.remove('show');
    $('resultDisplay').classList.remove('show');
    document.querySelectorAll('.substance-node').forEach(n => n.classList.remove('highlight'));
    document.querySelectorAll('.reaction-label').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active', 'completed'));
}

// 播放动画
function playAnimation(rx, fromNode, toNode) {
    clearAnimation();
    $('animationBox').classList.add('active');
    fromNode.classList.add('highlight');
    toNode.classList.add('highlight');

    document.querySelectorAll('.reaction-label').forEach(l => {
        if (l.textContent === rx.label) l.classList.add('active');
    });

    const equationParts = rx.equation.split('→');
    const reactants = equationParts[0].trim();
    const products = equationParts[1] ? equationParts[1].trim() : '';

    // 解析反应物和生成物
    const reactantList = parseSubstances(reactants);
    const productList = parseSubstances(products);

    // 阶段1：物质加入
    setStage(1);
    addReactants(reactantList, () => {
        // 阶段2：达到条件
        setTimeout(() => {
            setStage(2);
            showCondition(rx.label);
            applyCondition(rx.label);

            // 阶段3：现象
            setTimeout(() => {
                setStage(3);
                showPhenomenon(rx.desc);
                showReactionEffect(rx.desc);

                // 阶段4：结果
                setTimeout(() => {
                    setStage(4);
                    showResult(rx.equation, productList);
                }, 1500);
            }, 1500);
        }, 1000);
    });
}

// 解析物质
function parseSubstances(formula) {
    const result = [];
    const parts = formula.split('+');
    
    parts.forEach(part => {
        part = part.trim();
        // 提取系数和化学式
        const match = part.match(/^(\d*)(.+)$/);
        if (match) {
            const coef = match[1] ? parseInt(match[1]) : 1;
            const formula = match[2];
            for (let i = 0; i < coef; i++) {
                result.push(formula);
            }
        }
    });
    
    return result;
}

// 获取物质类型
function getMoleculeType(formula) {
    if (formula.includes('Fe') && !formula.includes('O') && !formula.includes('Cl') && !formula.includes('S')) return 'iron';
    if (formula.includes('O₂') || formula.includes('O2')) return 'oxygen';
    if (formula.includes('HCl') || formula.includes('H₂SO') || formula.includes('HNO')) return 'acid';
    if (formula.includes('OH') || formula.includes('NaOH')) return 'base';
    if (formula.includes('NaCl') || formula.includes('FeCl') || formula.includes('Na₂SO') || formula.includes('Na₂CO')) return 'salt';
    if (formula.includes('H₂O') || formula.includes('H2O')) return 'water';
    if (formula.includes('↑') || formula.includes('H₂') || formula.includes('O₂') || formula.includes('CO₂')) return 'gas';
    if (formula.includes('↓')) return 'precipitate';
    if (formula.includes('Fe') || formula.includes('S') || formula.includes('Na') || formula.includes('N') || formula.includes('Cl') || formula.includes('Si')) return 'iron';
    return 'salt';
}

// 格式化化学式显示（普通数字转下标，移除箭头符号）
function formatFormula(formula) {
    return formula
        .replace(/[0-9]/g, s => String.fromCharCode(s.charCodeAt(0) - 0x30 + 0x2080)) // 普通数字转下标
        .replace(/[₀-₉]/g, s => s) // 保留原有下标
        .replace(/[↑↓]/g, '') // 移除气体和沉淀符号
        .trim();
}

// 创建物质分子元素
function createMolecule(formula, className, size) {
    const molecule = document.createElement('div');
    const type = getMoleculeType(formula);
    const displayText = formatFormula(formula);
    
    molecule.className = `molecule ${type} ${className}`;
    molecule.textContent = displayText;
    
    // 根据文字长度调整大小
    const textLen = displayText.length;
    if (textLen <= 2) {
        molecule.style.width = `${size}px`;
        molecule.style.height = `${size}px`;
        molecule.style.fontSize = '0.7rem';
    } else if (textLen <= 4) {
        molecule.style.width = `${size + 10}px`;
        molecule.style.height = `${size}px`;
        molecule.style.fontSize = '0.6rem';
    } else {
        molecule.style.width = `${size + 20}px`;
        molecule.style.height = `${size}px`;
        molecule.style.fontSize = '0.55rem';
    }
    
    return molecule;
}

// 添加反应物
function addReactants(reactants, callback) {
    const beaker = $('beaker');
    const beakerRect = beaker.getBoundingClientRect();
    let delay = 0;
    
    reactants.forEach((formula, index) => {
        setTimeout(() => {
            const molecule = createMolecule(formula, 'falling', 35);
            
            // 随机位置
            const x = 20 + Math.random() * (beakerRect.width - 70);
            const y = 80 + Math.random() * 60;
            molecule.style.left = `${x}px`;
            molecule.style.top = `${y}px`;
            
            beaker.appendChild(molecule);
            
            // 添加液体
            if (index === reactants.length - 1) {
                setTimeout(() => {
                    $('beakerInner').style.height = '60px';
                    if (callback) callback();
                }, 500);
            }
        }, delay);
        delay += 600;
    });
    
    if (reactants.length === 0 && callback) callback();
}

// 显示反应条件
function showCondition(condition) {
    $('conditionDisplay').textContent = condition;
    $('conditionDisplay').classList.add('show');
}

// 应用反应条件效果
function applyCondition(condition) {
    if (condition.includes('点燃') || condition.includes('燃烧') || condition.includes('高温') || condition.includes('加热')) {
        $('flame').classList.add('show');
        $('beakerInner').classList.add('heating');
    }
}

// 显示实验现象
function showPhenomenon(desc) {
    $('phenomenonDisplay').textContent = desc;
    $('phenomenonDisplay').classList.add('show');
}

// 显示反应效果
function showReactionEffect(desc) {
    const beaker = $('beaker');
    
    // 气泡效果
    if (desc.includes('气泡') || desc.includes('气体')) {
        createBubbles(beaker, 8);
    }
    
    // 沉淀效果
    if (desc.includes('沉淀')) {
        createPrecipitate(beaker);
    }
    
    // 颜色变化
    if (desc.includes('红褐')) {
        $('beakerInner').style.background = 'linear-gradient(180deg, rgba(180, 80, 50, 0.4) 0%, rgba(139, 69, 19, 0.6) 100%)';
    } else if (desc.includes('浅绿')) {
        $('beakerInner').style.background = 'linear-gradient(180deg, rgba(144, 238, 144, 0.4) 0%, rgba(60, 179, 113, 0.6) 100%)';
    } else if (desc.includes('蓝')) {
        $('beakerInner').style.background = 'linear-gradient(180deg, rgba(100, 149, 237, 0.4) 0%, rgba(65, 105, 225, 0.6) 100%)';
    }
}

// 创建气泡
function createBubbles(beaker, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = 4 + Math.random() * 8;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${20 + Math.random() * 100}px`;
            bubble.style.bottom = '20px';
            beaker.appendChild(bubble);
            
            setTimeout(() => bubble.remove(), 1000);
        }, i * 200);
    }
}

// 创建沉淀
function createPrecipitate(beaker) {
    const precipitate = document.createElement('div');
    precipitate.className = 'molecule precipitate appearing';
    precipitate.textContent = '沉淀';
    precipitate.style.width = '60px';
    precipitate.style.height = '25px';
    precipitate.style.borderRadius = '10px';
    precipitate.style.left = '40px';
    precipitate.style.bottom = '10px';
    precipitate.style.top = 'auto';
    beaker.appendChild(precipitate);
}

// 显示结果
function showResult(equation, products) {
    $('resultFormula').textContent = equation;
    $('resultDisplay').classList.add('show');
    
    // 清除反应物，显示生成物
    const beaker = $('beaker');
    
    // 先让反应物消失
    beaker.querySelectorAll('.molecule:not(.precipitate)').forEach(m => {
        m.classList.add('dissolving');
    });
    
    // 添加生成物分子
    setTimeout(() => {
        beaker.querySelectorAll('.molecule.dissolving').forEach(m => m.remove());
        
        products.forEach((formula, index) => {
            // 不显示气体（气体逸出）
            if (!formula.includes('↑')) {
                setTimeout(() => {
                    const molecule = createMolecule(formula, 'appearing', 30);
                    molecule.style.left = `${15 + index * 45}px`;
                    molecule.style.top = `${90 + Math.random() * 40}px`;
                    beaker.appendChild(molecule);
                }, index * 300);
            }
        });
    }, 800);
}

// 设置阶段状态
function setStage(num) {
    document.querySelectorAll('.stage').forEach((s, i) => {
        if (i < num) s.classList.add('completed');
        if (i === num - 1) s.classList.add('active');
    });
}

// 显示模态框
function showModal(title, formula, reactions) {
    $('modalTitle').textContent = title;
    let html = `<div class="chem-formula">${formula}</div>`;
    
    if (reactions.length) {
        html += '<div style="margin-top:15px"><strong>相关反应：</strong></div>';
        reactions.forEach(r => {
            html += `<div class="equation-box">
                <div class="chem-formula">${r.equation}</div>
                <div class="desc">${r.desc}</div>
            </div>`;
        });
    }
    
    $('modalBody').innerHTML = html;
    $('modalOverlay').classList.add('active');
}

// 关闭模态框
function closeModal() {
    $('modalOverlay').classList.remove('active');
}

// 重置视图
function resetView() {
    zoomLevel = 1;
    $('diagramCanvas').querySelectorAll('.substance-node').forEach(n => {
        n.style.transform = 'translate(-50%, -50%)';
    });
}

// 缩放
function changeZoom(delta) {
    zoomLevel = Math.max(0.5, Math.min(2, zoomLevel + delta));
    $('diagramCanvas').querySelectorAll('.substance-node').forEach(n => {
        const current = n.style.transform || 'translate(-50%, -50%)';
        n.style.transform = current.replace(/scale\([^)]*\)/g, '') + ` scale(${zoomLevel})`;
    });
}

// 渲染知识详解
function renderKnowledgeDetail() {
    let html = '<h2>📚 化学知识点详解</h2>';
    Object.entries(chemistryData).forEach(([key, val]) => {
        html += `<div class="knowledge-section"><h3>${val.title}</h3>${val.knowledge}</div>`;
    });
    $('knowledgeDetail').innerHTML = html;
}

// 渲染有机反应
function renderOrganic() {
    let html = '<div class="diagram-container"><div class="diagram-header"><h2 class="diagram-title">🧬 有机化学反应</h2></div></div>';
    organicReactions.forEach(r => {
        html += `<div class="organic-card">
            <h3><span class="organic-tag">有机</span>${r.name}</h3>
            <p style="color:var(--text-secondary);margin-bottom:10px">${r.desc}</p>
            <div class="organic-equation"><div class="chem-formula">${r.equation}</div></div>
            <div style="margin-top:10px"><strong>反应条件：</strong><span style="color:var(--accent-orange)">${r.condition}</span></div>
            <div style="margin-top:10px"><strong>示例：</strong><span style="color:var(--primary)">${r.exampleName}</span></div>
            <div class="organic-equation" style="margin-top:10px"><div class="chem-formula">${r.example}</div></div>
        </div>`;
    });
    $('organicContent').innerHTML = html;
}

// 加载题目
function loadQuestion(idx) {
    const q = practiceQuestions[idx];
    
    $('questionType').textContent = q.type === 'choice' ? '选择题' : q.type === 'fill' ? '填空题' : '推断题';
    $('questionType').className = `question-type ${q.type}`;
    $('questionText').innerHTML = q.question;
    $('progressFill').style.width = `${(idx / 10) * 100}%`;
    $('progressText').textContent = `${idx}/10`;
    $('optionsContainer').innerHTML = '';
    $('answerSection').classList.remove('show');
    $('nextQuestionBtn').style.display = 'none';
    $('submitBtn').style.display = 'inline-block';
    $('submitBtn').disabled = false;
    selectedAnswer = null;

    // 显示/隐藏下标工具栏
    if (q.type === 'fill' || q.type === 'infer') {
        $('subscriptToolbar').style.display = 'flex';
    } else {
        $('subscriptToolbar').style.display = 'none';
    }

    if (q.type === 'choice') {
        q.options.forEach((opt, i) => {
            const li = document.createElement('li');
            li.className = 'option-item';
            li.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${opt}</span>`;
            li.addEventListener('click', () => {
                document.querySelectorAll('.option-item').forEach(x => x.classList.remove('selected'));
                li.classList.add('selected');
                selectedAnswer = i;
            });
            $('optionsContainer').appendChild(li);
        });
    } else if (q.type === 'fill') {
        const parts = q.question.split('___');
        let html = '';
        parts.forEach((p, i) => {
            html += `<span>${p}</span>`;
            if (i < parts.length - 1) {
                html += `<input type="text" class="fill-input" data-index="${i}" placeholder="填答案">`;
            }
        });
        $('optionsContainer').innerHTML = html;
    } else {
        $('optionsContainer').innerHTML = '<div class="infer-chain">' + q.chain.map((c, i) => {
            if (c === '?') {
                return `<input type="text" class="infer-input" id="inferInput" placeholder="?">`;
            }
            return `<span class="infer-node">${c}</span>`;
        }).join('') + '</div>';
    }
}

// 提交答案
function submitAnswer() {
    const q = practiceQuestions[currentQuestion];
    let correct = false;

    if (q.type === 'choice') {
        correct = selectedAnswer === q.answer;
        document.querySelectorAll('.option-item').forEach((opt, i) => {
            if (i === q.answer) opt.classList.add('correct');
            else if (i === selectedAnswer && !correct) opt.classList.add('wrong');
        });
    } else if (q.type === 'fill') {
        const inputs = document.querySelectorAll('.fill-input');
        let allCorrect = true;
        inputs.forEach((inp, i) => {
            const val = inp.value.trim();
            if (val === q.answers[i]) {
                inp.classList.add('correct');
            } else {
                allCorrect = false;
                inp.classList.add('wrong');
            }
        });
        correct = allCorrect;
    } else {
        const inp = document.getElementById('inferInput');
        correct = inp && inp.value.trim() === q.answer;
        if (correct) {
            inp.classList.add('correct');
        } else if (inp) {
            inp.classList.add('wrong');
        }
    }

    if (correct) score++;

    $('answerStatus').textContent = correct ? '回答正确！' : '回答错误';
    $('answerStatus').className = `answer-status ${correct ? 'correct' : 'wrong'}`;
    $('analysisBox').innerHTML = `<strong>解析：</strong>${q.analysis}`;
    $('answerSection').classList.add('show');
    $('submitBtn').style.display = 'none';

    if (currentQuestion < 9) {
        $('nextQuestionBtn').style.display = 'inline-block';
    } else {
        $('nextQuestionBtn').textContent = '查看结果';
        $('nextQuestionBtn').style.display = 'inline-block';
        $('nextQuestionBtn').onclick = showResults;
    }
}

// 下一题
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < 10) {
        loadQuestion(currentQuestion);
    } else {
        showResults();
    }
}

// 显示结果
function showResults() {
    $('questionText').innerHTML = `<h3 style="color:var(--primary);margin-bottom:20px">练习完成！</h3>
        <p style="font-size:1.2rem">您的得分：<strong style="color:var(--accent-green)">${score}/10</strong></p>
        <p style="color:var(--text-secondary);margin-top:10px">${score >= 8 ? '优秀！继续保持！' : score >= 6 ? '良好！还有进步空间' : '继续加油！多做练习！'}</p>`;
    $('optionsContainer').innerHTML = '';
    $('answerSection').classList.remove('show');
    $('nextQuestionBtn').style.display = 'none';
    $('submitBtn').style.display = 'none';
}

// 键盘快捷键
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    
    if (e.key >= '1' && e.key <= '6') {
        const elements = ['fe', 's', 'na', 'n', 'cl', 'si'];
        const idx = parseInt(e.key) - 1;
        if (elements[idx]) {
            currentElement = elements[idx];
            document.querySelectorAll('.element-card').forEach(c => c.classList.remove('active'));
            document.querySelector(`.element-card[data-element="${elements[idx]}"]`).classList.add('active');
            renderDiagram(elements[idx]);
        }
    }
    
    if (e.key === 'r' || e.key === 'R') resetView();
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
