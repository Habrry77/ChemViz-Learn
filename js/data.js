/**
 * 化学物质转化关系学习网站 - 数据文件
 */

// 元素转化数据
const chemistryData = {
    fe: {
        name: '铁',
        title: 'Fe - 铁元素转化关系',
        nodes: [
            { id: 'Fe', formula: 'Fe', name: '铁', type: 'metal' },
            { id: 'Fe3O4', formula: 'Fe₃O₄', name: '四氧化三铁', type: 'oxide' },
            { id: 'Fe2O3', formula: 'Fe₂O₃', name: '氧化铁', type: 'oxide' },
            { id: 'FeCl3', formula: 'FeCl₃', name: '氯化铁', type: 'salt' },
            { id: 'FeCl2', formula: 'FeCl₂', name: '氯化亚铁', type: 'salt' },
            { id: 'FeSO4', formula: 'FeSO₄', name: '硫酸亚铁', type: 'salt' },
            { id: 'Fe(OH)3', formula: 'Fe(OH)₃', name: '氢氧化铁', type: 'base' },
            { id: 'Fe(OH)2', formula: 'Fe(OH)₂', name: '氢氧化亚铁', type: 'base' },
            { id: 'FeS', formula: 'FeS', name: '硫化亚铁', type: 'salt' }
        ],
        reactions: [
            { from: 'Fe', to: 'Fe3O4', label: '点燃', equation: '3Fe + 2O₂ → Fe₃O₄', desc: '火星四射，生成黑色固体' },
            { from: 'Fe', to: 'Fe2O3', label: '高温', equation: '4Fe + 3O₂ → 2Fe₂O₃', desc: '铁锈的形成' },
            { from: 'Fe', to: 'FeCl2', label: '+HCl', equation: 'Fe + 2HCl → FeCl₂ + H₂↑', desc: '产生气泡，溶液变浅绿色' },
            { from: 'Fe', to: 'FeCl3', label: '+Cl₂', equation: '2Fe + 3Cl₂ → 2FeCl₃', desc: '剧烈燃烧，生成棕褐色固体' },
            { from: 'Fe', to: 'FeSO4', label: '+H₂SO₄', equation: 'Fe + H₂SO₄ → FeSO₄ + H₂↑', desc: '产生气泡，溶液变浅绿色' },
            { from: 'Fe', to: 'FeS', label: '+S', equation: 'Fe + S → FeS', desc: '黑色固体' },
            { from: 'FeCl3', to: 'Fe(OH)3', label: '+NaOH', equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl', desc: '红褐色沉淀' },
            { from: 'FeCl2', to: 'Fe(OH)2', label: '+NaOH', equation: 'FeCl₂ + 2NaOH → Fe(OH)₂↓ + 2NaCl', desc: '白色沉淀，迅速变灰绿后变红褐' },
            { from: 'Fe(OH)2', to: 'Fe(OH)3', label: '+O₂+H₂O', equation: '4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃', desc: '白色→灰绿→红褐色' },
            { from: 'FeCl3', to: 'FeCl2', label: '+Fe', equation: '2FeCl₃ + Fe → 3FeCl₂', desc: '溶液颜色变浅' }
        ],
        knowledge: '<div class="substance-info"><h4>🥇 铁 (Fe)</h4><p>银白色金属，密度7.86g/cm³，熔点1538℃。铁具有磁性，能被磁铁吸引。铁是地壳中含量第二高的金属元素（仅次于铝）。</p></div><div class="substance-info"><h4>🔴 铁的氧化物</h4><p><strong>Fe₃O₄</strong>（四氧化三铁）：黑色晶体，具有磁性，俗称磁性氧化铁或铁黑。</p><p><strong>Fe₂O₃</strong>（氧化铁）：红棕色粉末，俗称铁红，可用于炼铁和作颜料。</p></div><div class="substance-info"><h4>🧪 铁的化合物颜色</h4><p>Fe²⁺溶液：浅绿色 | Fe³⁺溶液：棕黄色</p><p>Fe(OH)₂：白色（易被氧化） | Fe(OH)₃：红褐色</p></div><div class="equation-box"><div class="chem-formula">Fe₂O₃ + 3CO → 2Fe + 3CO₂</div><div class="condition">高温</div><div class="desc">工业炼铁的主要反应</div></div>'
    },
    s: {
        name: '硫',
        title: 'S - 硫元素转化关系',
        nodes: [
            { id: 'S', formula: 'S', name: '硫', type: 'element' },
            { id: 'SO2', formula: 'SO₂', name: '二氧化硫', type: 'oxide' },
            { id: 'SO3', formula: 'SO₃', name: '三氧化硫', type: 'oxide' },
            { id: 'H2SO3', formula: 'H₂SO₃', name: '亚硫酸', type: 'acid' },
            { id: 'H2SO4', formula: 'H₂SO₄', name: '硫酸', type: 'acid' },
            { id: 'Na2SO3', formula: 'Na₂SO₃', name: '亚硫酸钠', type: 'salt' },
            { id: 'Na2SO4', formula: 'Na₂SO₄', name: '硫酸钠', type: 'salt' },
            { id: 'FeS', formula: 'FeS', name: '硫化亚铁', type: 'salt' }
        ],
        reactions: [
            { from: 'S', to: 'SO2', label: '燃烧', equation: 'S + O₂ → SO₂', desc: '刺激性气体，燃烧产生蓝紫色火焰' },
            { from: 'SO2', to: 'SO3', label: 'V₂O₅/△', equation: '2SO₂ + O₂ → 2SO₃', desc: '工业制硫酸的关键步骤' },
            { from: 'SO2', to: 'H2SO3', label: '+H₂O', equation: 'SO₂ + H₂O ⇌ H₂SO₃', desc: '亚硫酸，使紫色石蕊变红' },
            { from: 'SO3', to: 'H2SO4', label: '+H₂O', equation: 'SO₃ + H₂O → H₂SO₄', desc: '放出大量热' },
            { from: 'H2SO3', to: 'Na2SO3', label: '+NaOH', equation: 'H₂SO₃ + 2NaOH → Na₂SO₃ + 2H₂O', desc: '中和反应' },
            { from: 'H2SO4', to: 'Na2SO4', label: '+NaOH', equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O', desc: '中和反应' },
            { from: 'S', to: 'FeS', label: '加热', equation: 'Fe + S → FeS', desc: '黑色固体' }
        ],
        knowledge: '<div class="substance-info"><h4>🟡 硫 (S)</h4><p>淡黄色晶体，俗称硫磺。密度约2.07g/cm³，熔点112.8℃。硫不溶于水，微溶于酒精，易溶于二硫化碳。</p></div><div class="substance-info"><h4>💨 硫的氧化物</h4><p><strong>SO₂</strong>：无色刺激性气体，有毒，漂白性。</p><p><strong>SO₃</strong>：无色晶体，易挥发，溶于水生成硫酸。</p></div><div class="substance-info"><h4>🔬 硫酸的性质</h4><p>浓硫酸：吸水性、脱水性、强氧化性、酸性</p><p>稀硫酸：强酸性，能与金属、碱、氧化物、盐反应</p></div><div class="equation-box"><div class="chem-formula">Zn + H₂SO₄(稀) → ZnSO₄ + H₂↑</div><div class="condition">常温</div><div class="desc">实验室制氢气</div></div>'
    },
    na: {
        name: '钠',
        title: 'Na - 钠元素转化关系',
        nodes: [
            { id: 'Na', formula: 'Na', name: '钠', type: 'metal' },
            { id: 'Na2O', formula: 'Na₂O', name: '氧化钠', type: 'oxide' },
            { id: 'Na2O2', formula: 'Na₂O₂', name: '过氧化钠', type: 'oxide' },
            { id: 'NaOH', formula: 'NaOH', name: '氢氧化钠', type: 'base' },
            { id: 'Na2CO3', formula: 'Na₂CO₃', name: '碳酸钠', type: 'salt' },
            { id: 'NaHCO3', formula: 'NaHCO₃', name: '碳酸氢钠', type: 'salt' },
            { id: 'NaCl', formula: 'NaCl', name: '氯化钠', type: 'salt' }
        ],
        reactions: [
            { from: 'Na', to: 'Na2O', label: '氧化', equation: '4Na + O₂ → 2Na₂O', desc: '银白色钠表面变暗' },
            { from: 'Na', to: 'Na2O2', label: '燃烧', equation: '2Na + O₂ → Na₂O₂', desc: '黄色火焰' },
            { from: 'Na2O', to: 'NaOH', label: '+H₂O', equation: 'Na₂O + H₂O → 2NaOH', desc: '放出热量' },
            { from: 'Na2O2', to: 'NaOH', label: '+H₂O', equation: '2Na₂O₂ + 2H₂O → 4NaOH + O₂↑', desc: '产生气泡' },
            { from: 'Na', to: 'NaOH', label: '+H₂O', equation: '2Na + 2H₂O → 2NaOH + H₂↑', desc: '浮溶游响红' },
            { from: 'NaOH', to: 'Na2CO3', label: '+CO₂', equation: '2NaOH + CO₂ → Na₂CO₃ + H₂O', desc: '吸收CO₂' },
            { from: 'Na2CO3', to: 'NaHCO3', label: '+CO₂+H₂O', equation: 'Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃', desc: '碳酸氢钠沉淀' },
            { from: 'NaOH', to: 'NaCl', label: '+HCl', equation: 'NaOH + HCl → NaCl + H₂O', desc: '中和反应' }
        ],
        knowledge: '<div class="substance-info"><h4>🔴 钠 (Na)</h4><p>银白色金属，密度0.97g/cm³，比水轻。熔点97.8℃，质软可用刀切。钠化学性质活泼，需保存在煤油中。</p></div><div class="substance-info"><h4>💡 钠与水反应现象</h4><p><strong>浮</strong>：钠密度小于水<br><strong>熔</strong>：反应放热，钠熔化成小球<br><strong>游</strong>：产生氢气推动钠游动<br><strong>响</strong>：剧烈反应发出嘶嘶声<br><strong>红</strong>：滴加酚酞溶液变红（生成NaOH）</p></div><div class="substance-info"><h4>🧪 碳酸钠与碳酸氢钠</h4><p><strong>Na₂CO₃</strong>：纯碱，苏打，白色粉末，溶于水呈碱性</p><p><strong>NaHCO₃</strong>：小苏打，受热易分解，可用于发酵粉</p></div><div class="equation-box"><div class="chem-formula">2NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑</div><div class="condition">加热</div><div class="desc">实验室鉴别两者</div></div>'
    },
    n: {
        name: '氮',
        title: 'N - 氮元素转化关系',
        nodes: [
            { id: 'N2', formula: 'N₂', name: '氮气', type: 'element' },
            { id: 'NH3', formula: 'NH₃', name: '氨气', type: 'element' },
            { id: 'NO', formula: 'NO', name: '一氧化氮', type: 'oxide' },
            { id: 'NO2', formula: 'NO₂', name: '二氧化氮', type: 'oxide' },
            { id: 'HNO3', formula: 'HNO₃', name: '硝酸', type: 'acid' },
            { id: 'NH4NO3', formula: 'NH₄NO₃', name: '硝酸铵', type: 'salt' },
            { id: 'NH4Cl', formula: 'NH₄Cl', name: '氯化铵', type: 'salt' }
        ],
        reactions: [
            { from: 'N2', to: 'NH3', label: 'Haber法', equation: 'N₂ + 3H₂ ⇌ 2NH₃', desc: '高温高压催化剂' },
            { from: 'N2', to: 'NO', label: '闪电', equation: 'N₂ + O₂ → 2NO', desc: '自然固氮' },
            { from: 'NO', to: 'NO2', label: '+O₂', equation: '2NO + O₂ → 2NO₂', desc: '红棕色气体' },
            { from: 'NO2', to: 'HNO3', label: '+H₂O', equation: '3NO₂ + H₂O → 2HNO₃ + NO', desc: '工业制硝酸' },
            { from: 'NH3', to: 'NH4Cl', label: '+HCl', equation: 'NH₃ + HCl → NH₄Cl', desc: '白烟' },
            { from: 'NH3', to: 'NH4NO3', label: '+HNO₃', equation: 'NH₃ + HNO₃ → NH₄NO₃', desc: '中和反应' },
            { from: 'NH4NO3', to: 'N2', label: '分解', equation: '2NH₄NO₃ → 2N₂ + O₂ + 4H₂O', desc: '爆炸反应' }
        ],
        knowledge: '<div class="substance-info"><h4>🔵 氮气 (N₂)</h4><p>无色无味气体，密度与空气相近。氮气化学性质稳定，但在高温或放电条件下能与氧气反应。</p></div><div class="substance-info"><h4>💨 氨气 (NH₃)</h4><p>无色刺激性气体，密度小于空气。极易溶于水（1:700），水溶液呈碱性。氨气易液化，可作制冷剂。</p></div><div class="substance-info"><h4>🔴 硝酸 (HNO₃)</h4><p>无色液体，见光或加热易分解（4HNO₃ → 4NO₂ + 2H₂O + O₂）。具有强氧化性和腐蚀性。</p></div><div class="equation-box"><div class="chem-formula">NH₃ + H₂O ⇌ NH₃·H₂O ⇌ NH₄⁺ + OH⁻</div><div class="condition">可逆</div><div class="desc">氨水呈弱碱性</div></div>'
    },
    cl: {
        name: '氯',
        title: 'Cl - 氯元素转化关系',
        nodes: [
            { id: 'Cl2', formula: 'Cl₂', name: '氯气', type: 'element' },
            { id: 'HCl', formula: 'HCl', name: '氯化氢', type: 'acid' },
            { id: 'HClO', formula: 'HClO', name: '次氯酸', type: 'acid' },
            { id: 'NaCl', formula: 'NaCl', name: '氯化钠', type: 'salt' },
            { id: 'NaClO', formula: 'NaClO', name: '次氯酸钠', type: 'salt' },
            { id: 'Ca(ClO)2', formula: 'Ca(ClO)₂', name: '次氯酸钙', type: 'salt' }
        ],
        reactions: [
            { from: 'Cl2', to: 'HCl', label: '+H₂', equation: 'Cl₂ + H₂ → 2HCl', desc: '燃烧发出苍白色火焰' },
            { from: 'Cl2', to: 'HClO', label: '+H₂O', equation: 'Cl₂ + H₂O ⇌ HCl + HClO', desc: '氯水' },
            { from: 'HCl', to: 'NaCl', label: '+NaOH', equation: 'HCl + NaOH → NaCl + H₂O', desc: '中和反应' },
            { from: 'Cl2', to: 'NaClO', label: '+NaOH', equation: 'Cl₂ + 2NaOH → NaCl + NaClO + H₂O', desc: '制漂白液' },
            { from: 'Cl2', to: 'Ca(ClO)2', label: '+Ca(OH)₂', equation: '2Cl₂ + 2Ca(OH)₂ → CaCl₂ + Ca(ClO)₂ + 2H₂O', desc: '制漂白粉' },
            { from: 'NaClO', to: 'HClO', label: '+CO₂+H₂O', equation: '2NaClO + CO₂ + H₂O → Na₂CO₃ + 2HClO', desc: '变质原理' }
        ],
        knowledge: '<div class="substance-info"><h4>🟡 氯气 (Cl₂)</h4><p>黄绿色有毒气体，密度大于空气，有强烈的刺激性气味。氯气溶于水生成氯水，具有氧化性和漂白性。</p></div><div class="substance-info"><h4>🧴 次氯酸 (HClO)</h4><p>弱酸，不稳定，见光易分解：2HClO → 2HCl + O₂↑。次氯酸具有强氧化性，可用于漂白和消毒。</p></div><div class="substance-info"><h4>🧪 漂白粉</h4><p>主要成分Ca(ClO)₂，有效成分是次氯酸根ClO⁻。原理：Ca(ClO)₂ + CO₂ + H₂O → CaCO₃ + 2HClO</p></div><div class="equation-box"><div class="chem-formula">Cl₂ + 2NaOH → NaCl + NaClO + H₂O</div><div class="condition">常温</div><div class="desc">工业制漂白液</div></div>'
    },
    si: {
        name: '硅',
        title: 'Si - 硅元素转化关系',
        nodes: [
            { id: 'Si', formula: 'Si', name: '硅', type: 'element' },
            { id: 'SiO2', formula: 'SiO₂', name: '二氧化硅', type: 'oxide' },
            { id: 'Na2SiO3', formula: 'Na₂SiO₃', name: '硅酸钠', type: 'salt' },
            { id: 'H2SiO3', formula: 'H₂SiO₃', name: '硅酸', type: 'acid' },
            { id: 'SiCl4', formula: 'SiCl₄', name: '四氯化硅', type: 'salt' },
            { id: 'CaSiO3', formula: 'CaSiO₃', name: '硅酸钙', type: 'salt' }
        ],
        reactions: [
            { from: 'Si', to: 'SiO2', label: '燃烧', equation: 'Si + O₂ → SiO₂', desc: '生成白色固体' },
            { from: 'Si', to: 'SiCl4', label: '+Cl₂', equation: 'Si + 2Cl₂ → SiCl₄', desc: '高温反应' },
            { from: 'SiO2', to: 'Na2SiO3', label: '+NaOH', equation: 'SiO₂ + 2NaOH → Na₂SiO₃ + H₂O', desc: '玻璃瓶塞打不开' },
            { from: 'SiO2', to: 'CaSiO3', label: '+CaO', equation: 'SiO₂ + CaO → CaSiO₃', desc: '炼铁除脉石' },
            { from: 'Na2SiO3', to: 'H2SiO3', label: '+HCl', equation: 'Na₂SiO₃ + 2HCl → H₂SiO₃↓ + 2NaCl', desc: '白色凝胶沉淀' }
        ],
        knowledge: '<div class="substance-info"><h4>⬛ 硅 (Si)</h4><p>灰黑色固体，有金属光泽，半导体材料。硅在地壳中含量丰富（仅次于氧），是信息技术的核心材料。</p></div><div class="substance-info"><h4>🔷 二氧化硅 (SiO₂)</h4><p>俗称硅石，天然存在的有石英、水晶、硅藻土等。硬度大，不溶于水。SiO₂是光导纤维的主要成分。</p></div><div class="substance-info"><h4>💧 硅酸 (H₂SiO₃)</h4><p>白色固体，不溶于水，酸性很弱。硅酸凝胶经干燥脱水后得硅胶，常用作干燥剂和吸附剂。</p></div><div class="equation-box"><div class="chem-formula">SiO₂ + 4HF → SiF₄↑ + 2H₂O</div><div class="condition">常温</div><div class="desc">氢氟酸刻蚀玻璃</div></div>'
    }
};

// 练习题目
const practiceQuestions = [
    {
        type: 'choice',
        question: '铁在氧气中燃烧的产物是？',
        options: ['FeO', 'Fe₂O₃', 'Fe₃O₄', 'FeCl₂'],
        answer: 2,
        analysis: '铁在氧气中燃烧生成Fe₃O₄，现象为火星四射，生成黑色固体。反应方程式：3Fe + 2O₂ → Fe₃O₄'
    },
    {
        type: 'choice',
        question: '下列物质受热分解时，产物中有氧气生成的是？',
        options: ['NaHCO₃', 'NH₄NO₃', 'KMnO₄', 'CaCO₃'],
        answer: 2,
        analysis: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑，高锰酸钾受热分解产生氧气。NaHCO₃分解产生CO₂，NH₄NO₃分解产生N₂，CaCO₃分解产生CO₂。'
    },
    {
        type: 'choice',
        question: '浓硫酸具有的性质是？',
        options: ['挥发性', '吸水性', '碱性', '可燃性'],
        answer: 1,
        analysis: '浓硫酸具有吸水性（干燥气体）、脱水性（使有机物碳化）、强氧化性（与金属反应不产生氢气）。浓硫酸不挥发，不具碱性，不可燃。'
    },
    {
        type: 'fill',
        question: '完成化学方程式：2Na + 2H₂O → ___ + ___',
        answers: ['2NaOH', 'H₂↑'],
        analysis: '钠与水反应生成氢氧化钠和氢气。现象：浮（密度小）、熔（放热）、游（产生氢气）、响（剧烈反应）、红（生成碱）。'
    },
    {
        type: 'infer',
        question: '推断以下转化链中的物质：',
        chain: ['Fe', '→', '?', '→', 'FeCl₃'],
        answer: 'FeCl₂',
        analysis: 'Fe → FeCl₂ → FeCl₃。铁与盐酸反应生成氯化亚铁(FeCl₂)，氯化亚铁与氯气反应生成氯化铁(FeCl₃)。'
    },
    {
        type: 'choice',
        question: '下列气体中，能使湿润的红色石蕊试纸变蓝的是？',
        options: ['Cl₂', 'NH₃', 'SO₂', 'CO₂'],
        answer: 1,
        analysis: '氨气(NH₃)溶于水形成氨水，呈碱性，能使红色石蕊试纸变蓝。Cl₂与水反应生成HClO和HCl，SO₂和CO₂溶于水生成酸，使红色石蕊变红。'
    },
    {
        type: 'fill',
        question: '完成化学方程式：___ + 3CO → 2Fe + 3CO₂',
        answers: ['Fe₂O₃'],
        analysis: '这是工业炼铁的主要反应。一氧化碳在高温下还原氧化铁，得到铁和二氧化碳。方程式：Fe₂O₃ + 3CO → 2Fe + 3CO₂'
    },
    {
        type: 'choice',
        question: '下列物质中，能直接生成氯气的是？',
        options: ['氯化钠', '浓盐酸', '次氯酸', '高锰酸钾'],
        answer: 3,
        analysis: '高锰酸钾(KMnO₄)与浓盐酸反应可生成氯气：2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 8H₂O + 5Cl₂↑'
    },
    {
        type: 'infer',
        question: '推断以下转化链中的物质：',
        chain: ['S', '→', 'SO₂', '→', '?', '→', 'H₂SO₄'],
        answer: 'SO₃',
        analysis: 'S → SO₂ → SO₃ → H₂SO₄。硫燃烧生成二氧化硫，二氧化硫被氧化为三氧化硫，三氧化硫与水反应生成硫酸。'
    },
    {
        type: 'choice',
        question: '下列物质中，可用于治疗胃酸过多的是？',
        options: ['NaOH', 'Al(OH)₃', 'H₂SO₄', 'NaCl'],
        answer: 1,
        analysis: '氢氧化铝(Al(OH)₃)是常用的抗酸药，能中和胃酸(HCl)且不对人体造成伤害。NaOH腐蚀性太强，H₂SO₄是酸，NaCl不与酸反应。'
    }
];

// 有机反应
const organicReactions = [
    {
        name: '酯化反应',
        equation: 'R-COOH + R\'-OH ⇌ R-COOR\' + H₂O',
        condition: '浓H₂SO₄，加热',
        desc: '羧酸与醇反应生成酯和水，浓硫酸作催化剂和吸水剂',
        example: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
        exampleName: '乙酸乙酯'
    },
    {
        name: '水解反应',
        equation: '酯 + 水 ⇌ 酸 + 醇',
        condition: '稀H₂SO₄或NaOH',
        desc: '酯在酸或碱催化下与水反应生成相应的酸和醇',
        example: 'CH₃COOC₂H₅ + H₂O ⇌ CH₃COOH + C₂H₅OH',
        exampleName: '乙酸乙酯水解'
    },
    {
        name: '皂化反应',
        equation: '油脂 + NaOH → 甘油 + 高级脂肪酸钠',
        condition: '加热',
        desc: '酯在碱性条件下水解，生成醇和羧酸盐（肥皂的制法）',
        example: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → C₃H₅(OH)₃ + 3C₁₇H₃₅COONa',
        exampleName: '硬脂酸甘油酯'
    },
    {
        name: '加成反应',
        equation: 'C=C + H₂ → CH-CH',
        condition: 'Ni催化，加热',
        desc: '含有不饱和键的有机物与其他分子直接结合的反应',
        example: 'CH₂=CH₂ + H₂ → CH₃-CH₃',
        exampleName: '乙烯加氢'
    },
    {
        name: '取代反应',
        equation: '烷烃 + X₂ → 卤代烃 + HX',
        condition: '光照或加热',
        desc: '有机物分子中原子或原子团被其他原子或原子团替代的反应',
        example: 'CH₄ + Cl₂ → CH₃Cl + HCl',
        exampleName: '甲烷氯化'
    },
    {
        name: '加聚反应',
        equation: 'n 单体 → 聚合物',
        condition: '催化剂',
        desc: '含有不饱和键的小分子结合成大分子的反应',
        example: 'n CH₂=CH₂ → [-CH₂-CH₂-]ₙ',
        exampleName: '聚乙烯'
    }
];
