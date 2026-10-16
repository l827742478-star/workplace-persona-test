const STORAGE_KEY = "workplace-persona-v1";
const PROGRESS_KEY = "workplace-persona-progress-v1";

const archetypes = {
  strategist: { name: "谋局型", english: "THE STRATEGIST", color: "#4f68c8", tagline: "你不是不行动，你更在意每一步落在哪里。", body: "你习惯先看全局，再决定自己要站在哪个位置。复杂、模糊、牵涉多人利益的任务，反而容易让你进入状态。你真正的优势不是“想得多”，而是能把混乱整理成顺序。", advice: "别把所有变量都等齐才开始。给自己一个七成信息就能推进的小节点。", share: "看清局面的人，往往不用抢第一步。" },
  charger: { name: "冲锋型", english: "THE CHARGER", color: "#e65c4e", tagline: "先把局面推起来，再在路上修正方向。", body: "你对停滞的容忍度很低。事情一旦需要有人带头，你通常会先站出来，把模糊的任务变成下一步动作。你带来的不是完美计划，而是让团队重新动起来的速度。", advice: "给冲劲配一个复盘点。每次冲出去前，先写下什么信号出现时要刹车。", share: "有人等共识，有人先把门推开。" },
  guardian: { name: "守边型", english: "THE GUARDIAN", color: "#4b8a76", tagline: "你可以配合，但不会把自己交出去。", body: "你清楚什么可以让步，什么必须守住。面对模糊要求、无休止加码或情绪化沟通，你会本能地寻找边界和规则。稳定感不是保守，而是你持续输出的底盘。", advice: "边界不必等到忍无可忍才宣布。越早说清楚，关系越不需要靠猜。", share: "可靠不是永远答应，而是知道什么不能答应。" },
  connector: { name: "搭桥型", english: "THE CONNECTOR", color: "#c98c3a", tagline: "你看见的是人，也看见事情怎样才能继续。", body: "你擅长在不同立场之间找到能被听见的说法。团队卡住时，你经常先处理情绪和误会，再把大家带回问题本身。你不一定声音最大，但常常是让合作不散的人。", advice: "别把所有人的舒服都当成你的责任。协调之后，也要留下自己的判断。", share: "会让事情继续的人，值得被看见。" },
  observer: { name: "潜伏型", english: "THE OBSERVER", color: "#7564a7", tagline: "你不急着表态，因为你在等真正有用的信息。", body: "你习惯观察规则、权力和情绪的流向。你不喜欢为了证明存在感而发言，但一旦开口，通常已经想过后果。你在陌生环境里的生存力，来自安静地读懂现场。", advice: "观察是优势，但不要让“再看看”变成错过窗口。给等待设置截止时间。", share: "安静不是缺席，是你在收集证据。" },
  fixer: { name: "救火型", english: "THE FIXER", color: "#b05b74", tagline: "问题来了先别慌，你总能找到能动的那一根线。", body: "你对现场变化很敏感，也愿意接住别人不想接的烂摊子。你擅长临场拆解、补位和恢复秩序，是团队里很难被替代的“把事情做完的人”。", advice: "不要只在危机里证明价值。把你的经验写成流程，才能不靠下一次救火。", share: "不是喜欢混乱，只是你知道怎么把混乱收回来。" },
  creator: { name: "破局型", english: "THE CREATOR", color: "#d15a3d", tagline: "旧方法能跑，但你总想知道有没有另一条路。", body: "你不太满足于“大家一直这样做”。当规则开始阻碍目标，你会尝试换个角度、换种表达或重新定义问题。你的价值常常出现在没人写过说明书的地方。", advice: "让新点子有一个最小试验，不用一开始就说服所有人。", share: "你不是为了反对规则，而是想让规则重新服务于目标。" },
  steady: { name: "稳进型", english: "THE STEADY", color: "#657580", tagline: "把今天做好，事情就会慢慢长出答案。", body: "你不迷信爆发式成长，更相信节奏、积累和可持续。你会把大目标拆成可以完成的小步，在别人换方向时继续把手上的事情做扎实。", advice: "稳定不等于停留。每隔一段时间，主动给自己一次升级难度的机会。", share: "走得久的人，未必走得最响，但常常走得最远。" }
};

const questions = [
  { tag: "任务开始", title: "接到一个没有明确说明书的任务，你会先做什么？", hint: "选最像你真实第一反应的做法。", options: [
    ["先画出目标、限制和关键关系，再排顺序。", ["strategist", "observer"], [4, 1, 0, 0, 2, 0]],
    ["先做一个能跑起来的版本，边做边问。", ["charger", "creator"], [1, 4, 0, 0, 1, 2]],
    ["先找做过类似事情的人，听听现场经验。", ["connector", "fixer"], [0, 2, 0, 4, 2, 1]],
    ["先确认边界、交付标准和谁负责什么。", ["guardian", "steady"], [1, 1, 4, 0, 3, 0]]
  ]},
  { tag: "临时变化", title: "会议前一小时，需求突然改了，你更接近哪种反应？", hint: "不用选“最正确”的，只选你最自然的动作。", options: [
    ["迅速判断改动影响，马上重排优先级。", ["strategist", "fixer"], [4, 3, 0, 0, 2, 0]],
    ["先接受变化，现场把方案改到能用。", ["charger", "fixer"], [1, 4, 0, 0, 1, 1]],
    ["先问清楚为什么改，确认不是一时兴起。", ["guardian", "observer"], [3, 1, 4, 0, 2, 0]],
    ["先让相关的人都知道，避免有人掉队。", ["connector", "steady"], [1, 1, 1, 4, 3, 0]]
  ]},
  { tag: "协作摩擦", title: "同事反复拖延，影响了你的进度，你会？", hint: "看你会先处理关系、任务，还是规则。", options: [
    ["把卡点拆开，约一个短时间一起解决。", ["connector", "fixer"], [1, 2, 0, 4, 2, 1]],
    ["直接说明影响和截止时间，请对方给出承诺。", ["guardian", "charger"], [1, 3, 4, 0, 1, 1]],
    ["先自己补上缺口，之后再复盘流程。", ["fixer", "steady"], [1, 3, 1, 1, 4, 0]],
    ["先观察他卡在哪里，再决定是否介入。", ["observer", "strategist"], [4, 1, 1, 1, 3, 0]]
  ]},
  { tag: "被误解", title: "你的方案被误解了，你最想做的第一件事是？", hint: "回答你会做什么，而不是你希望自己做什么。", options: [
    ["换一种更具体的方式，把逻辑和例子讲清楚。", ["connector", "creator"], [2, 1, 0, 4, 1, 3]],
    ["先问对方担心什么，再调整方案。", ["connector", "strategist"], [3, 1, 0, 4, 1, 1]],
    ["如果目标没变，就按原计划继续推进。", ["steady", "guardian"], [1, 2, 4, 0, 4, 0]],
    ["指出关键误读，快速把讨论拉回问题。", ["charger", "creator"], [1, 4, 2, 0, 1, 3]]
  ]},
  { tag: "边界时刻", title: "别人临时把一项额外工作塞给你，你会？", hint: "职场人格最容易在“顺手帮一下”里暴露。", options: [
    ["问清优先级，确认它会替代哪件原任务。", ["strategist", "guardian"], [4, 1, 4, 0, 2, 0]],
    ["先接下来，看看能不能快速处理掉。", ["fixer", "charger"], [0, 4, 1, 1, 2, 0]],
    ["如果对方确实有难处，我会尽量帮一把。", ["connector", "fixer"], [0, 2, 1, 4, 2, 1]],
    ["说明当前负荷和可接受的完成时间。", ["guardian", "steady"], [1, 1, 4, 0, 4, 0]]
  ]},
  { tag: "领导风格", title: "如果让你带一个小项目，你最在意什么？", hint: "没有好坏，只有你会把注意力放在哪里。", options: [
    ["方向、节奏和每个人手上的关键节点。", ["strategist", "steady"], [4, 2, 1, 1, 3, 0]],
    ["团队有没有敢于试错、把事情推起来。", ["charger", "creator"], [1, 4, 0, 2, 1, 3]],
    ["大家是否知道规则、边界和交付标准。", ["guardian", "steady"], [2, 1, 4, 1, 4, 0]],
    ["有没有人被落下，信息是不是流动的。", ["connector", "fixer"], [1, 2, 1, 4, 2, 1]]
  ]},
  { tag: "压力来临", title: "连续几天高压之后，你通常会怎么恢复？", hint: "选你实际会做的，不是理想中的休息方式。", options: [
    ["整理复盘，把失控的事情重新排出秩序。", ["strategist", "steady"], [4, 1, 1, 0, 4, 0]],
    ["先彻底离开工作，做点让自己有感觉的事。", ["creator", "charger"], [0, 3, 0, 1, 2, 4]],
    ["找一个信任的人聊聊，把情绪说出来。", ["connector", "fixer"], [0, 1, 0, 4, 3, 2]],
    ["减少社交，给自己留一段不被打扰的时间。", ["observer", "guardian"], [3, 0, 4, 0, 4, 0]]
  ]},
  { tag: "公开表达", title: "你需要在一群人面前表达一个不成熟的想法，你会？", hint: "这道题测的是你如何让想法获得生存空间。", options: [
    ["先讲一个最小版本，邀请大家一起补全。", ["creator", "connector"], [1, 3, 0, 4, 1, 4]],
    ["准备好逻辑和数据，再正式说出来。", ["strategist", "observer"], [4, 2, 0, 1, 2, 3]],
    ["直接说出核心判断，看现场反应再调整。", ["charger", "creator"], [1, 4, 0, 1, 1, 4]],
    ["先确认这个场合是否真的适合讨论它。", ["observer", "guardian"], [4, 1, 4, 0, 3, 0]]
  ]},
  { tag: "模糊评价", title: "收到一句“再有冲劲一点”的反馈，你会？", hint: "模糊反馈的处理方式，通常比结果更像你。", options: [
    ["追问具体场景，把形容词变成可执行动作。", ["strategist", "connector"], [4, 2, 1, 4, 1, 1]],
    ["先把动作做大一点，快速交一个新版。", ["charger", "creator"], [1, 4, 0, 0, 1, 3]],
    ["判断这是不是对方真正想解决的问题。", ["observer", "strategist"], [4, 1, 2, 1, 2, 0]],
    ["确认评价标准和最终责任由谁承担。", ["guardian", "steady"], [2, 1, 4, 0, 4, 0]]
  ]},
  { tag: "新环境", title: "刚加入一个新团队，你通常会先做什么？", hint: "选你最常用的进入方式。", options: [
    ["观察谁影响决策、信息从哪里流动。", ["observer", "strategist"], [4, 0, 2, 1, 2, 0]],
    ["主动接一个小任务，用结果认识大家。", ["charger", "fixer"], [1, 4, 0, 2, 2, 1]],
    ["找几个人聊聊，了解团队的真实习惯。", ["connector", "observer"], [1, 1, 0, 4, 2, 1]],
    ["先弄清流程、权限和不能踩的线。", ["guardian", "steady"], [2, 1, 4, 0, 4, 0]]
  ]},
  { tag: "资源不足", title: "项目资源明显不够，你会？", hint: "看你是先争取、重排，还是另起一条路。", options: [
    ["重新定义最小交付，先保住核心目标。", ["strategist", "steady"], [4, 2, 2, 0, 4, 0]],
    ["去找能借到的人和资源，边走边谈。", ["connector", "charger"], [1, 4, 0, 4, 1, 1]],
    ["换一种做法，绕开最耗资源的部分。", ["creator", "observer"], [3, 3, 0, 0, 2, 4]],
    ["把风险和缺口说清楚，重新确认承诺。", ["guardian", "strategist"], [4, 1, 4, 0, 2, 1]]
  ]},
  { tag: "冲突处理", title: "两位同事争执不下，你被请去给意见，你会？", hint: "不需要当裁判，先选你自然的介入角度。", options: [
    ["把争议拆成事实、目标和各自的底线。", ["strategist", "guardian"], [4, 1, 4, 0, 2, 1]],
    ["让双方先各自说完，再找可以行动的共同点。", ["connector", "fixer"], [1, 2, 0, 4, 2, 1]],
    ["给出一个小范围试行方案，先停止空转。", ["charger", "creator"], [1, 4, 0, 1, 2, 3]],
    ["先听一会儿，判断这场争执的真正利益点。", ["observer", "strategist"], [4, 1, 1, 1, 2, 0]]
  ]},
  { tag: "成就感", title: "哪种时刻最容易让你觉得“这事做得值”？", hint: "你追求的成就感，会决定你能长期坚持什么。", options: [
    ["把复杂问题理顺，所有人终于知道下一步。", ["strategist", "steady"], [4, 1, 1, 1, 3, 1]],
    ["从零做出一个没人试过的东西。", ["creator", "charger"], [1, 4, 0, 0, 2, 4]],
    ["有人因为你的协调，重新愿意一起合作。", ["connector", "fixer"], [0, 1, 0, 4, 2, 2]],
    ["守住标准，长期结果没有因为压力变形。", ["guardian", "steady"], [2, 1, 4, 0, 4, 0]]
  ]},
  { tag: "犯错之后", title: "你发现自己做了一个影响结果的错误，第一反应是？", hint: "选择最接近你当下会做的事。", options: [
    ["先止损，把影响范围和补救路径列出来。", ["fixer", "strategist"], [4, 3, 1, 0, 4, 0]],
    ["马上承认并提出一个修正动作。", ["charger", "steady"], [1, 4, 2, 0, 3, 1]],
    ["先把事实和责任边界确认清楚。", ["guardian", "observer"], [3, 1, 4, 0, 3, 0]],
    ["先告诉受影响的人，避免信息差扩大。", ["connector", "fixer"], [1, 2, 1, 4, 2, 1]]
  ]},
  { tag: "被催进度", title: "别人频繁催你进度，但你知道现在还不是交付时机，你会？", hint: "你如何保护质量，也如何让对方安心？", options: [
    ["给出当前版本、风险和明确的下一次更新时间。", ["strategist", "steady"], [4, 2, 2, 1, 4, 1]],
    ["先交一个半成品，让对方看到确实在推进。", ["charger", "creator"], [1, 4, 0, 1, 2, 3]],
    ["把不能提前交付的原因讲清楚，请对方确认取舍。", ["guardian", "connector"], [3, 1, 4, 4, 2, 1]],
    ["先观察对方真正焦虑的是什么，再对症回应。", ["observer", "connector"], [4, 1, 1, 4, 2, 0]]
  ]},
  { tag: "长期选择", title: "面对一份更高薪但更混乱的工作，你更看重？", hint: "这不是职业建议，只是看你的默认权衡。", options: [
    ["能不能掌握关键变量，以及未来的成长空间。", ["strategist", "creator"], [4, 2, 1, 0, 2, 3]],
    ["能不能让我快速做出成绩，获得更大舞台。", ["charger", "creator"], [1, 4, 0, 0, 1, 4]],
    ["规则、边界和长期节奏是不是可承受。", ["guardian", "steady"], [2, 1, 4, 0, 4, 0]],
    ["团队是否值得信任，遇到问题能不能一起扛。", ["connector", "fixer"], [1, 1, 1, 4, 3, 1]]
  ]},
  { tag: "说不出口", title: "你不同意一个决定，但现场没有人支持你，你会？", hint: "真正的边界感往往出现在没有掌声的时候。", options: [
    ["先保留证据，找更合适的时机单独沟通。", ["observer", "strategist"], [4, 0, 3, 0, 3, 1]],
    ["直接说出风险，即使现场气氛会变紧。", ["guardian", "charger"], [2, 4, 4, 0, 2, 2]],
    ["先找一个共同目标，从目标而不是立场切入。", ["connector", "strategist"], [3, 1, 1, 4, 2, 2]],
    ["如果风险可控，就先执行，再用结果验证。", ["creator", "steady"], [1, 3, 1, 0, 4, 3]]
  ]},
  { tag: "结束一天", title: "下班前还有一件事没做完，你会？", hint: "这道题看你的收尾方式，不代表效率高低。", options: [
    ["写下明天的第一步，放心离开。", ["steady", "strategist"], [4, 1, 1, 0, 4, 0]],
    ["如果十分钟能解决，就今天收掉。", ["fixer", "charger"], [1, 4, 0, 0, 3, 0]],
    ["确认它是否真的需要你现在完成。", ["guardian", "observer"], [4, 1, 4, 0, 3, 0]],
    ["和相关的人同步状态，避免明天从误会开始。", ["connector", "steady"], [1, 1, 1, 4, 3, 1]]
  ]},
  { tag: "你的节奏", title: "如果把职场比作一段长途旅程，你更像？", hint: "最后一题，选一个你愿意认领的画面。", options: [
    ["拿着地图的人：先看地形，再决定路线。", ["strategist", "observer"], [4, 1, 1, 0, 3, 1]],
    ["推开第一扇门的人：先走起来，路会出现。", ["charger", "creator"], [1, 4, 0, 0, 2, 4]],
    ["看守营火的人：让同行的人知道这里安全。", ["guardian", "connector"], [1, 1, 4, 4, 4, 0]],
    ["修整装备的人：不快，但下一段还能继续。", ["steady", "fixer"], [1, 2, 1, 0, 4, 1]]
  ]}
];

const app = document.querySelector("#app");
let state = { screen: "home", current: 0, answers: [], scores: makeScores(), lastResult: null };

function makeScores() { return Object.fromEntries(Object.keys(archetypes).map((key) => [key, 0])); }
function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }
function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ current: state.current, answers: state.answers, scores: state.scores }));
}
function restoreProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (saved && Array.isArray(saved.answers) && saved.answers.length && saved.current < questions.length) {
      state.current = saved.current; state.answers = saved.answers; state.scores = saved.scores || makeScores(); return true;
    }
  } catch { /* ignore invalid local state */ }
  return false;
}
function resetProgress() { localStorage.removeItem(PROGRESS_KEY); state.current = 0; state.answers = []; state.scores = makeScores(); }
function rebuildScores() {
  state.scores = makeScores();
  state.answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === undefined || !questions[questionIndex]) return;
    const option = questions[questionIndex].options[answerIndex];
    option[1].forEach((type) => { state.scores[type] += 3; });
    option[2].forEach((value, i) => { if (value) state.scores[Object.keys(archetypes)[i]] += Math.round(value / 2); });
  });
}
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) { toast = document.createElement("div"); toast.className = "toast"; document.body.appendChild(toast); }
  toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function scrollTop() { window.scrollTo({ top: 0, behavior: "smooth" }); app.focus({ preventScroll: true }); }

function renderHome() {
  const resumed = restoreProgress();
  app.innerHTML = `<section class="hero" id="home">
    <div class="hero-copy">
      <p class="eyebrow">职场人格档案 / 01</p>
      <h1>你是哪种<br /><em>职场生存人格？</em></h1>
      <p class="hero-lede">不是测你行不行，而是看你在规则、关系和压力里，最常用哪一种活法。</p>
      <div class="hero-actions"><button class="primary-btn" data-action="start">开始测一测 <span aria-hidden="true">↗</span></button><a class="secondary-btn" href="#how">先看看测什么</a></div>
      <p class="privacy-note">19 个真实场景 · 约 5 分钟 · 不需要登录 · 答案只保存在你的浏览器</p>
      ${resumed ? `<button class="text-btn resume-btn" data-action="resume">继续上次进度（第 ${Math.min(state.current + 1, questions.length)} 题）</button>` : ""}
    </div>
    <div class="hero-aside"><div class="file-card" aria-label="示例人格档案卡"><div class="card-kicker">PERSONA FILE / SAMPLE</div><h2>谋局型</h2><p class="card-subtitle">你不是不行动，你更在意每一步落在哪里。</p><div class="meter-label"><span>判断力</span><span>84</span></div><div class="meter"><i style="width:84%"></i></div><div class="meter-label"><span>推进力</span><span>62</span></div><div class="meter"><i class="blue" style="width:62%"></i></div><div class="card-stamp">可保存 · 可分享</div></div><span class="card-side-note">一张看懂自己的职场档案</span></div>
  </section>
  <div class="proof-strip" aria-label="测试信息"><div class="proof-item"><span class="proof-value">19</span><span class="proof-label">个真实职场场景</span></div><div class="proof-item"><span class="proof-value">8</span><span class="proof-label">种原创人格结果</span></div><div class="proof-item"><span class="proof-value">5 min</span><span class="proof-label">完成并生成结果卡</span></div></div>
  <section class="section" id="how"><div class="section-heading"><h2>测完，你会拿到什么？</h2><p>每个答案都不是“对或错”，它只是在记录你如何推进事情、保护自己和与人合作。</p></div><div class="feature-grid"><article class="feature"><span class="feature-index">01</span><h3>看见你的默认动作</h3><p>从任务、边界、冲突和压力里，找出你最常用的应对方式。</p></article><article class="feature"><span class="feature-index">02</span><h3>得到一张人格档案</h3><p>优势、容易卡住的地方、适合的工作环境，一次整理出来。</p></article><article class="feature"><span class="feature-index">03</span><h3>保存一张结果卡</h3><p>把你的类型和一句话带走，发给朋友，看看你们在职场上是不是同一派。</p></article></div></section>
  <section class="section sample-section"><div class="section-heading"><h2>一份结果，会说什么？</h2><p>先看一个示例。真正结果会根据你的答案生成。</p></div><div class="report-list"><div class="report-row"><strong>你的行动方式</strong><p>先把混乱整理成顺序，再决定下一步落在哪里。</p></div><div class="report-row"><strong>你的隐藏优势</strong><p>在多方拉扯的现场，依然能看见关键变量。</p></div><div class="report-row"><strong>给你的提醒</strong><p>别等所有信息齐全才开始，七成确定也可以推进。</p></div></div></section>
  <section class="section"><div class="section-heading"><h2>开始前，先知道</h2><p>这是一面轻量的镜子，不是一份给你下结论的诊断。</p></div><div class="faq"><details><summary>需要登录吗？</summary><p>不需要。答题进度和结果只保存在当前浏览器的本地存储里。</p></details><details><summary>结果会不会每次都一样？</summary><p>相同答案会得到相同类型；重新作答时，你可以观察自己在不同场景里的选择变化。</p></details><details><summary>这是真正的心理测评吗？</summary><p>不是。它用于趣味自我观察，不替代心理咨询、职业测评或重大决策。</p></details><details><summary>可以把结果发给朋友吗？</summary><p>可以。结果页支持下载一张简洁的分享卡，也能复制一段结果文案。</p></details></div></section>`;
  document.querySelector('[data-action="start"]')?.addEventListener("click", () => { resetProgress(); state.screen = "quiz"; renderQuiz(); scrollTop(); });
  document.querySelector('[data-action="resume"]')?.addEventListener("click", () => { state.screen = "quiz"; renderQuiz(); scrollTop(); });
}

function renderQuiz() {
  const question = questions[state.current];
  const progress = Math.round((state.current / questions.length) * 100);
  app.innerHTML = `<section class="quiz-shell"><div class="quiz-top"><span>职场人格档案</span><span>第 ${String(state.current + 1).padStart(2, "0")} / ${questions.length}</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${state.current}"><div class="progress-fill" style="width:${progress}%"></div></div><p class="question-kicker">${escapeHTML(question.tag)}</p><h1 class="question-title">${escapeHTML(question.title)}</h1><p class="question-hint">${escapeHTML(question.hint)}</p><div class="option-grid" role="list">${question.options.map((option, index) => `<button class="option" data-option="${index}" role="listitem"><span class="option-key">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option[0])}</span></button>`).join("")}</div><div class="quiz-actions"><button class="text-btn" data-action="back" ${state.current === 0 ? "disabled" : ""}>← 上一题</button><button class="text-btn" data-action="quit">暂存并退出</button></div></section>`;
  document.querySelectorAll("[data-option]").forEach((button) => button.addEventListener("click", () => chooseOption(Number(button.dataset.option))));
  document.querySelector('[data-action="back"]')?.addEventListener("click", goBack);
  document.querySelector('[data-action="quit"]')?.addEventListener("click", () => { saveProgress(); state.screen = "home"; renderHome(); scrollTop(); showToast("进度已保存"); });
}
function chooseOption(index) {
  const option = questions[state.current].options[index];
  state.answers[state.current] = index;
  rebuildScores();
  saveProgress();
  if (state.current === questions.length - 1) finishQuiz(); else { state.current += 1; renderQuiz(); scrollTop(); }
}
function goBack() { if (state.current > 0) { state.current -= 1; renderQuiz(); scrollTop(); } }
function finishQuiz() {
  const ranked = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  const resultKey = ranked[0][0];
  state.lastResult = { key: resultKey, scores: state.scores, at: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lastResult)); localStorage.removeItem(PROGRESS_KEY); state.screen = "result"; renderResult(); scrollTop();
}
function getDimensionScores(scores) {
  const keys = ["判断力", "推进力", "边界感", "协作力", "抗压值", "表达欲"];
  const raw = [scores.strategist + scores.observer, scores.charger + scores.creator, scores.guardian + scores.steady, scores.connector + scores.fixer, scores.guardian + scores.fixer + scores.steady, scores.creator + scores.connector + scores.charger];
  const max = Math.max(...raw, 1); return keys.map((name, index) => ({ name, value: Math.min(96, Math.max(34, Math.round((raw[index] / max) * 86))) }));
}
function renderResult() {
  const stored = state.lastResult || JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (!stored) { state.screen = "home"; renderHome(); return; }
  state.lastResult = stored; const type = archetypes[stored.key]; const dims = getDimensionScores(stored.scores);
  app.innerHTML = `<section class="result-shell"><div class="result-layout"><div><p class="result-kicker">你的职场人格档案 / 已生成</p><h1 style="color:${type.color}">${type.name}</h1><p class="result-tagline">${type.tagline}</p><p class="result-body">${type.body}</p><div class="result-actions"><button class="primary-btn" data-action="download">下载结果卡</button><button class="secondary-btn" data-action="copy">复制结果文案</button></div><p class="result-disclaimer">这是一份趣味自我观察，不构成心理测评、职业诊断或人生结论。</p><div class="dimension-list">${dims.map((dim) => `<div class="dimension"><span>${dim.name}</span><div class="dimension-bar"><i style="width:${dim.value}%;background:${type.color}"></i></div><span>${dim.value}</span></div>`).join("")}</div></div><div class="share-card" id="share-card"><div class="share-card-top"><span>职场人格档案</span><span>NO. 018</span></div><h2>${type.name}</h2><p class="quote">“${type.share}”</p><div class="share-card-footer"><span>${type.english}</span><strong>保存 / 分享</strong></div></div></div><div class="result-actions" style="margin-top:54px"><button class="text-btn" data-action="again">↻ 重新测试</button><button class="text-btn" data-action="home">⌂ 回到首页</button></div></section>`;
  document.querySelector('[data-action="download"]').addEventListener("click", () => downloadResultCard(type, dims));
  document.querySelector('[data-action="copy"]').addEventListener("click", () => copyResult(type));
  document.querySelector('[data-action="again"]').addEventListener("click", () => { resetProgress(); state.screen = "quiz"; renderQuiz(); scrollTop(); });
  document.querySelector('[data-action="home"]').addEventListener("click", () => { state.screen = "home"; renderHome(); scrollTop(); });
}
function copyResult(type) {
  const text = `我的职场生存人格是「${type.name}」\n${type.tagline}\n${type.share}\n测一测你是哪种职场生存人格？`;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => showToast("结果文案已复制")).catch(() => showToast("请长按选择结果文案"));
  else showToast("请长按选择结果文案");
}
function downloadResultCard(type, dims) {
  const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1440; const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#171a21"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = type.color; ctx.fillRect(0, 0, 1080, 18); ctx.fillRect(85, 102, 150, 12);
  ctx.fillStyle = "#c8ccd8"; ctx.font = "22px Arial, sans-serif"; ctx.fillText("职场人格档案", 85, 90); ctx.fillText("PERSONA / 018", 810, 90);
  ctx.fillStyle = "#fffdf8"; ctx.font = "600 150px STKaiti, KaiTi, serif"; ctx.fillText(type.name, 85, 570);
  ctx.fillStyle = "#d7d9df"; ctx.font = "28px Arial, sans-serif"; wrapText(ctx, `“${type.share}”`, 85, 660, 780, 48);
  ctx.fillStyle = "#9fa5b2"; ctx.font = "20px Arial, sans-serif"; ctx.fillText(type.english, 85, 860);
  dims.forEach((dim, index) => { const y = 955 + index * 54; ctx.fillStyle = "#c8ccd8"; ctx.font = "20px Arial, sans-serif"; ctx.fillText(dim.name, 85, y); ctx.fillStyle = "#3b3f49"; ctx.fillRect(220, y - 17, 600, 12); ctx.fillStyle = type.color; ctx.fillRect(220, y - 17, dim.value * 6, 12); ctx.fillStyle = "#fffdf8"; ctx.fillText(String(dim.value), 850, y); });
  ctx.fillStyle = "#858b99"; ctx.font = "18px Arial, sans-serif"; ctx.fillText("趣味自我观察 · 不构成心理测评", 85, 1310); ctx.fillText("workplace persona archive / 2026", 85, 1355);
  const link = document.createElement("a"); link.download = `职场人格-${type.name}.png`; link.href = canvas.toDataURL("image/png"); link.click(); showToast("结果卡已下载");
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) { let line = ""; let lineY = y; for (const char of text) { const test = line + char; if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, lineY); line = char; lineY += lineHeight; } else line = test; } ctx.fillText(line, x, lineY); }

function boot() {
  if (location.hash === "#result" && localStorage.getItem(STORAGE_KEY)) state.screen = "result";
  if (state.screen === "result") renderResult(); else renderHome();
}
window.addEventListener("hashchange", boot);
boot();
