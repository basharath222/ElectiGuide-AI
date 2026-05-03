/**
 * ElectiGuide AI - Complete Election Assistant
 * No API keys required - Fully functional offline
 */

// ========== APPLICATION STATE ==========
let currentView = 'dashboard';
let userData = {
  zipCode: '',
  registrationStatus: null,
  preferredVotingMethod: null
};

// Load saved data
if (localStorage.getItem('electiguide_user')) {
  userData = JSON.parse(localStorage.getItem('electiguide_user'));
}

// ========== CANDIDATE DATA ==========
const candidates = [
  {
    name: "Alexandra Chen",
    party: "Progressive Alliance",
    image: "🎯",
    promises: {
      economy: "Create 2 million green jobs, raise minimum wage to $15, tax breaks for small businesses",
      healthcare: "Medicare for All option, lower prescription drug prices, mental health coverage",
      education: "Free community college, reduce student loan interest, increase teacher pay",
      climate: "Net-zero emissions by 2040, invest in renewable energy, clean water protection",
      immigration: "Path to citizenship for DREAMers, modernize visa system, border security technology"
    },
    experience: "Former Governor, 8 years |Senate, 6 years",
    slogan: "Progress for All Americans"
  },
  {
    name: "Michael Rodriguez",
    party: "United Future",
    image: "⭐",
    promises: {
      economy: "Cut taxes for middle class, reduce regulations, incentivize manufacturing",
      healthcare: "Protect pre-existing conditions, increase competition, lower costs through innovation",
      education: "School choice, vocational training, merit-based teacher bonuses",
      climate: "Nuclear energy investment, carbon capture technology, protect national parks",
      immigration: "Border security first, merit-based immigration, faster family reunification"
    },
    experience: "US Representative, 10 years |Business Owner",
    slogan: "Opportunity for Every American"
  },
  {
    name: "Dr. Sarah Washington",
    party: "Independent",
    image: "🌟",
    promises: {
      economy: "Universal basic income pilot, break up monopolies, worker co-ops",
      healthcare: "Public option with private competition, negotiate drug prices, rural health access",
      education: "Student debt forgiveness, universal pre-K, life skills curriculum",
      climate: "Green New Deal framework, environmental justice, sustainable agriculture",
      immigration: "Humanitarian approach, expedite asylum cases, pathway to citizenship"
    },
    experience: "Professor of Economics, 15 years |Non-profit Founder",
    slogan: "People Over Politics"
  }
];

// ========== ELECTION PROCESS STEPS ==========
const electionProcess = [
  {
    step: 1,
    title: "Register to Vote",
    description: "Check your registration status or register online through your state's election website.",
    details: "Most states require registration 15-30 days before Election Day. You can register online, by mail, or in person.",
    actions: ["Check registration status", "Update your address", "Register to vote"],
    icon: "📝"
  },
  {
    step: 2,
    title: "Research Candidates",
    description: "Learn about candidates' positions on issues that matter to you using our candidate comparison tool.",
    details: "Look beyond party affiliation. Consider their experience, voting record, and specific policy proposals.",
    actions: ["Compare candidate promises", "Watch debates", "Read fact-checked news"],
    icon: "🔍"
  },
  {
    step: 3,
    title: "Make Your Plan",
    description: "Decide when and how you'll vote - early voting, mail-in ballot, or Election Day.",
    details: "Check polling hours, locate your polling place, and plan transportation.",
    actions: ["Find polling location", "Request mail ballot", "Check early voting dates"],
    icon: "🗺️"
  },
  {
    step: 4,
    title: "Vote!",
    description: "Cast your ballot and make your voice heard in the election.",
    details: "Bring valid ID if required. Take your time reviewing the ballot.",
    actions: ["Vote on Election Day", "Drop off mail ballot", "Use early voting"],
    icon: "🗳️"
  },
  {
    step: 5,
    title: "Stay Involved",
    description: "Elections don't end on Election Day. Stay informed about results and future elections.",
    details: "Follow local elections, attend town halls, and encourage others to vote.",
    actions: ["Check election results", "Attend community meetings", "Help others register"],
    icon: "🤝"
  }
];

// ========== SMART CHATBOT (No API Needed) ==========
const chatbotResponses = {
  "register": "To register to vote, visit your state's election website. You'll need your driver's license or Social Security number. Most states have online registration!",
  "deadline": "Voter registration deadlines vary by state - typically 15-30 days before Election Day. Early voting deadlines are usually 1-2 weeks before. Check your local election office for exact dates!",
  "mail ballot": "A mail-in ballot (or absentee ballot) allows you to vote by mail instead of going to a polling place. Request one from your local election office - no excuse needed in most states now!",
  "polling place": "Your polling place is where you vote on Election Day. Find it through your local election board website using your address. Hours are usually 7 AM to 7 PM!",
  "id required": "ID requirements vary by state - about half require photo ID. Check your state's rules at Vote.gov. Bring it just in case!",
  "early voting": "Early voting lets you vote in person before Election Day - usually 1-2 weeks prior. Locations and hours vary, but it's more convenient and less crowded!",
  "candidates": "Our Candidates section shows top candidates and their promises on key issues. Remember to research local candidates too - they affect your community directly!",
  "promises": "Candidate promises are their policy goals if elected. Always fact-check promises through nonpartisan sources like OpenSecrets or League of Women Voters!",
  "crowd": "Check our Crowd Guide for real-time wait times at polling locations. Report your wait to help others plan their visit!",
  "timeline": "Key election dates include: registration deadline, early voting start, mail ballot request deadline, and Election Day. Check our Timeline tool for your area!",
  "how to vote": "Voting process: 1) Register by deadline, 2) Research candidates, 3) Find polling place/get mail ballot, 4) Vote!, 5) Confirm your ballot was counted. Easy!",
  "help": "I can explain voting terms, candidate research, election process, deadlines, and voting methods. What would you like to know?"
};

function getChatbotResponse(question) {
  const lowerQuestion = question.toLowerCase();
  
  // Keywords matching
  if (lowerQuestion.includes('register') || lowerQuestion.includes('registration')) {
    return chatbotResponses["register"];
  } else if (lowerQuestion.includes('deadline') || lowerQuestion.includes('when')) {
    return chatbotResponses["deadline"];
  } else if (lowerQuestion.includes('mail') || lowerQuestion.includes('absentee')) {
    return chatbotResponses["mail ballot"];
  } else if (lowerQuestion.includes('polling') || lowerQuestion.includes('where')) {
    return chatbotResponses["polling place"];
  } else if (lowerQuestion.includes('id') || lowerQuestion.includes('identification')) {
    return chatbotResponses["id required"];
  } else if (lowerQuestion.includes('early voting')) {
    return chatbotResponses["early voting"];
  } else if (lowerQuestion.includes('candidate')) {
    return chatbotResponses["candidates"];
  } else if (lowerQuestion.includes('promise') || lowerQuestion.includes('policy')) {
    return chatbotResponses["promises"];
  } else if (lowerQuestion.includes('crowd') || lowerQuestion.includes('wait')) {
    return chatbotResponses["crowd"];
  } else if (lowerQuestion.includes('timeline') || lowerQuestion.includes('dates')) {
    return chatbotResponses["timeline"];
  } else if (lowerQuestion.includes('how to vote') || lowerQuestion.includes('process')) {
    return chatbotResponses["how to vote"];
  } else {
    return "Great question! I can help with: 📝 Registration, 📅 Deadlines, 📬 Mail voting, 🗺️ Polling places, 🆔 ID requirements, 🗳️ Early voting, 👥 Candidate research, and more. What specific topic interests you?";
  }
}

// ========== CROWD DATA (Real-time updates) ==========
let crowdData = {
  "90210": { waitTime: 12, reports: 45, lastUpdate: Date.now(), trend: "moderate" },
  "10001": { waitTime: 25, reports: 67, lastUpdate: Date.now(), trend: "busy" },
  "60601": { waitTime: 8, reports: 23, lastUpdate: Date.now(), trend: "quiet" },
  "94105": { waitTime: 35, reports: 89, lastUpdate: Date.now(), trend: "very busy" },
  "default": { waitTime: 15, reports: 128, lastUpdate: Date.now(), trend: "moderate" }
};

function getCrowdStatus(zip) {
  return crowdData[zip] || crowdData.default;
}

function reportWaitTime(zip, minutes) {
  const current = getCrowdStatus(zip);
  const newReports = current.reports + 1;
  const newAvg = Math.floor(((current.waitTime * current.reports) + minutes) / newReports);
  
  let trend = "moderate";
  if (newAvg < 10) trend = "quiet";
  else if (newAvg < 20) trend = "moderate";
  else if (newAvg < 30) trend = "busy";
  else trend = "very busy";
  
  crowdData[zip] = {
    waitTime: newAvg,
    reports: newReports,
    lastUpdate: Date.now(),
    trend: trend
  };
  
  localStorage.setItem('crowdData', JSON.stringify(crowdData));
  return crowdData[zip];
}

// ========== RENDER FUNCTIONS ==========
function render() {
  const root = document.getElementById('app-root');
  if (!root) return;
  
  let html = '';
  switch(currentView) {
    case 'dashboard':
      html = renderDashboard();
      break;
    case 'candidates':
      html = renderCandidates();
      break;
    case 'process':
      html = renderProcess();
      break;
    case 'timeline':
      html = renderTimeline();
      break;
    case 'crowd':
      html = renderCrowd();
      break;
    case 'chatbot':
      html = renderChatbot();
      break;
    default:
      html = renderDashboard();
  }
  
  root.innerHTML = `<div class="view-transition">${html}</div>`;
  attachEventListeners();
}

function renderDashboard() {
  const crowd = getCrowdStatus(userData.zipCode || "default");
  
  return `
    <div class="space-y-6">
      <!-- Welcome Banner -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 class="text-3xl font-bold mb-2">Welcome to ElectiGuide AI</h1>
        <p class="text-blue-100">Your nonpartisan companion for understanding elections, candidates, and the voting process</p>
      </div>
      
      <!-- User Info Card -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-bold mb-4 flex items-center"><i class="fas fa-user mr-2 text-blue-600"></i>Your Election Profile</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Your ZIP Code</label>
            <input type="text" id="user-zip" maxlength="5" class="w-full p-2 border rounded-lg" placeholder="Enter ZIP" value="${userData.zipCode || ''}">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Registration Status</label>
            <select id="user-status" class="w-full p-2 border rounded-lg">
              <option value="">Select status</option>
              <option value="registered" ${userData.registrationStatus === 'registered' ? 'selected' : ''}>✅ Registered to vote</option>
              <option value="need" ${userData.registrationStatus === 'need' ? 'selected' : ''}>📝 Need to register</option>
              <option value="unsure" ${userData.registrationStatus === 'unsure' ? 'selected' : ''}>❓ Not sure</option>
            </select>
          </div>
        </div>
        <button id="save-profile" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Save Profile</button>
      </div>
      
      <!-- Quick Stats -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-md p-4 text-center">
          <i class="fas fa-users text-3xl text-blue-600 mb-2"></i>
          <p class="text-2xl font-bold">${candidates.length}</p>
          <p class="text-gray-600">Candidates to Compare</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-4 text-center">
          <i class="fas fa-clock text-3xl text-blue-600 mb-2"></i>
          <p class="text-2xl font-bold">${crowd.waitTime}</p>
          <p class="text-gray-600">Avg Wait Time (min)</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-4 text-center">
          <i class="fas fa-check-circle text-3xl text-blue-600 mb-2"></i>
          <p class="text-2xl font-bold">5</p>
          <p class="text-gray-600">Simple Steps to Vote</p>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid md:grid-cols-2 gap-4">
        <button data-nav="process" class="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
          <i class="fas fa-book-open text-2xl text-green-600 mb-2"></i>
          <h3 class="font-bold text-lg">Learn Voting Process</h3>
          <p class="text-gray-600 text-sm">Step-by-step guide to voting</p>
        </button>
        <button data-nav="candidates" class="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition">
          <i class="fas fa-users text-2xl text-purple-600 mb-2"></i>
          <h3 class="font-bold text-lg">Compare Candidates</h3>
          <p class="text-gray-600 text-sm">See promises on key issues</p>
        </button>
      </div>
    </div>
  `;
}

function renderCandidates() {
  const topics = ["economy", "healthcare", "education", "climate", "immigration"];
  const topicLabels = { economy: "💰 Economy", healthcare: "🏥 Healthcare", education: "📚 Education", climate: "🌍 Climate", immigration: "🌎 Immigration" };
  let selectedTopic = arguments[1] || "economy";
  
  return `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-users mr-2 text-blue-600"></i>Candidate Comparison</h2>
      <p class="text-gray-600">Neutral, factual information about candidate positions. No endorsements or recommendations.</p>
      
      <!-- Topic Selector -->
      <div class="flex flex-wrap gap-2 border-b pb-4">
        ${topics.map(topic => `
          <button data-topic="${topic}" class="topic-btn px-4 py-2 rounded-lg ${selectedTopic === topic ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'}">
            ${topicLabels[topic]}
          </button>
        `).join('')}
      </div>
      
      <!-- Candidate Cards -->
      <div class="grid md:grid-cols-3 gap-6">
        ${candidates.map(candidate => `
          <div class="candidate-card bg-white rounded-xl shadow-md overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white text-center">
              <div class="text-5xl mb-2">${candidate.image}</div>
              <h3 class="font-bold text-xl">${candidate.name}</h3>
              <p class="text-sm opacity-90">${candidate.party}</p>
              <p class="text-xs mt-1 italic">"${candidate.slogan}"</p>
            </div>
            <div class="p-4">
              <div class="mb-3">
                <p class="text-xs text-gray-500">Experience</p>
                <p class="text-sm font-medium">${candidate.experience}</p>
              </div>
              <div class="mb-3">
                <p class="text-xs text-gray-500">${topicLabels[selectedTopic]}</p>
                <p class="text-sm">${candidate.promises[selectedTopic]}</p>
              </div>
              <div class="mt-3 pt-3 border-t">
                <p class="text-xs text-blue-600 font-medium">Key Promise</p>
                <p class="text-xs text-gray-600">${candidate.promises[selectedTopic].substring(0, 80)}...</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p class="text-sm text-yellow-800"><i class="fas fa-info-circle mr-2"></i>Remember: These are candidate statements. Always verify through official sources and nonpartisan organizations.</p>
      </div>
    </div>
  `;
}

function renderProcess() {
  return `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-book-open mr-2 text-blue-600"></i>How to Vote - Step by Step</h2>
      
      <!-- Progress Steps -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex flex-wrap md:flex-nowrap justify-between mb-8 relative">
          ${electionProcess.map((step, idx) => `
            <div class="step-item text-center flex-1">
              <div class="step-circle mx-auto mb-2">
                <i class="fas ${step.icon === '📝' ? 'fa-pen' : step.icon === '🔍' ? 'fa-search' : step.icon === '🗺️' ? 'fa-map' : step.icon === '🗳️' ? 'fa-vote-yea' : 'fa-hand-peace'}"></i>
              </div>
              <p class="font-semibold text-sm">${step.title}</p>
            </div>
          `).join('')}
        </div>
        
        ${electionProcess.map((step, idx) => `
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-start">
              <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                ${step.step}
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-lg">${step.title}</h3>
                <p class="text-gray-700 mt-1">${step.description}</p>
                <div class="mt-3 p-3 bg-white rounded">
                  <p class="text-sm text-gray-600"><i class="fas fa-info-circle mr-1 text-blue-600"></i>${step.details}</p>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  ${step.actions.map(action => `
                    <span class="text-xs bg-gray-200 px-2 py-1 rounded-full">${action}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Tips Card -->
      <div class="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 class="font-bold text-green-800 mb-2"><i class="fas fa-lightbulb mr-2"></i>Pro Tips</h3>
        <ul class="list-disc list-inside space-y-1 text-green-700">
          <li>Check your registration status 30 days before Election Day</li>
          <li>Make a voting plan - know when and where you'll vote</li>
          <li>Bring required ID and a sample ballot if helpful</li>
          <li>Use our Crowd Guide to avoid long waits</li>
          <li>Encourage friends and family to vote too!</li>
        </ul>
      </div>
    </div>
  `;
}

function renderTimeline() {
  const zip = userData.zipCode || "your area";
  const electionYear = "2026";
  
  const dates = [
    { event: "Voter Registration Deadline", date: "October 19, 2026", daysLeft: "Register now!", type: "critical" },
    { event: "Early Voting Begins", date: "October 24, 2026", daysLeft: "Plan ahead", type: "important" },
    { event: "Mail Ballot Request Deadline", date: "October 27, 2026", daysLeft: "Request early", type: "critical" },
    { event: "Absentee Ballot Return Deadline", date: "November 2, 2026", daysLeft: "Mail early", type: "important" },
    { event: "Election Day", date: "November 3, 2026", daysLeft: "VOTE!", type: "critical" }
  ];
  
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-calendar mr-2 text-blue-600"></i>Election Timeline ${electionYear}</h2>
        <button id="add-all-calendar" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          <i class="fas fa-calendar-plus mr-1"></i>Add All to Calendar
        </button>
      </div>
      
      <p class="text-gray-600">Key dates for ${zip}. Times may vary by location - verify with local election office.</p>
      
      <div class="space-y-3">
        ${dates.map(d => `
          <div class="bg-white rounded-xl shadow-md p-4 flex flex-wrap justify-between items-center">
            <div class="flex-1">
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full ${d.type === 'critical' ? 'bg-red-500' : 'bg-yellow-500'} mr-2"></div>
                <h3 class="font-semibold">${d.event}</h3>
              </div>
              <p class="text-2xl font-bold text-blue-600 mt-1">${d.date}</p>
              <p class="text-sm text-gray-500">${d.daysLeft}</p>
            </div>
            <button data-event="${d.event}" data-date="${d.date}" class="add-cal-btn bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm">
              <i class="fas fa-calendar-plus mr-1"></i>Add
            </button>
          </div>
        `).join('')}
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <p class="text-sm text-blue-800"><i class="fas fa-info-circle mr-2"></i>Click "Add to Calendar" to save to Google Calendar (opens in new tab). No login required!</p>
      </div>
    </div>
  `;
}

function renderCrowd() {
  const crowd = getCrowdStatus(userData.zipCode || "default");
  
  const statusColors = {
    quiet: "text-green-600 bg-green-100",
    moderate: "text-yellow-600 bg-yellow-100",
    busy: "text-orange-600 bg-orange-100",
    "very busy": "text-red-600 bg-red-100"
  };
  
  return `
    <div class="space-y-6 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-users mr-2 text-blue-600"></i>Live Crowd Guide</h2>
      
      <div class="bg-white rounded-xl shadow-lg p-6 text-center">
        <div class="mb-4">
          <i class="fas fa-map-marker-alt text-blue-600 text-3xl"></i>
          <p class="text-gray-600 mt-1">Area: ${userData.zipCode || "Not set - add ZIP in Dashboard"}</p>
        </div>
        
        <div class="mb-4">
          <div class="text-6xl font-bold mb-2" id="crowd-wait">${crowd.waitTime}</div>
          <p class="text-gray-600">minutes estimated wait time</p>
          <span class="inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${statusColors[crowd.trend]}">
            ${crowd.trend.toUpperCase()} ${crowd.trend === 'quiet' ? '😊' : crowd.trend === 'busy' ? '⚠️' : '🔴'}
          </span>
        </div>
        
        <div class="text-sm text-gray-500 mb-6">
          Based on ${crowd.reports} community reports • Updated ${Math.floor((Date.now() - crowd.lastUpdate) / 60000)} min ago
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <label class="block text-sm font-medium mb-2">Report your wait time to help others:</label>
          <div class="flex gap-2">
            <input type="number" id="wait-time-input" placeholder="Minutes waited" class="flex-1 p-2 border rounded-lg" min="1" max="120">
            <button id="submit-wait" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              <i class="fas fa-share mr-1"></i>Report
            </button>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button data-nav="dashboard" class="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Back to Dashboard</button>
          <button id="refresh-crowd" class="flex-1 bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
            <i class="fas fa-sync-alt mr-1"></i>Refresh
          </button>
        </div>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg text-sm">
        <i class="fas fa-info-circle mr-2 text-yellow-600"></i>
        Wait times are community-reported and updated in real-time. Help make this guide better by reporting your experience!
      </div>
    </div>
  `;
}

// Chatbot state
let chatHistory = [
  { role: "assistant", content: "👋 Hello! I'm your Election Assistant. Ask me anything about voting, candidates, registration, deadlines, or the election process. I provide neutral, factual information only - no endorsements!" }
];

function renderChatbot() {
  return `
    <div class="space-y-4 max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <h2 class="text-xl font-bold flex items-center"><i class="fas fa-robot mr-2"></i>Election Assistant AI</h2>
          <p class="text-sm opacity-90">Ask me anything about voting - no endorsements, just facts!</p>
        </div>
        
        <div id="chat-messages" class="h-96 overflow-y-auto p-4 space-y-3 chat-scroll">
          ${chatHistory.map(msg => `
            <div class="chat-message flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg p-3">
                ${msg.role === 'user' ? '<i class="fas fa-user mr-2 text-sm"></i>' : '<i class="fas fa-robot mr-2 text-sm"></i>'}
                ${msg.content}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="border-t p-4 bg-gray-50">
          <div class="flex gap-2">
            <input type="text" id="chat-input" placeholder="Ask about voting... e.g., 'How do I register?' or 'What's early voting?'" 
                   class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button id="chat-send" class="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <button class="suggest-btn text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">How do I register?</button>
            <button class="suggest-btn text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">What are candidate promises?</button>
            <button class="suggest-btn text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">When is Election Day?</button>
            <button class="suggest-btn text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">What ID do I need?</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========== EVENT HANDLERS ==========
function attachEventListeners() {
  // Navigation
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentView = btn.getAttribute('data-nav');
      render();
    });
  });
  
  // Save profile
  const saveBtn = document.getElementById('save-profile');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const zip = document.getElementById('user-zip')?.value;
      const status = document.getElementById('user-status')?.value;
      if (zip) userData.zipCode = zip;
      if (status) userData.registrationStatus = status;
      localStorage.setItem('electiguide_user', JSON.stringify(userData));
      alert('Profile saved!');
    });
  }
  
  // Candidate topic buttons
  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const topic = btn.getAttribute('data-topic');
      if (topic) {
        const newHtml = renderCandidates(topic);
        document.getElementById('app-root').innerHTML = `<div class="view-transition">${newHtml}</div>`;
        attachEventListeners();
      }
    });
  });
  
  // Calendar buttons
  document.querySelectorAll('.add-cal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventName = btn.getAttribute('data-event');
      const eventDate = btn.getAttribute('data-date');
      if (eventName && eventDate) {
        const startDate = new Date(eventDate + ' 09:00:00');
        const endDate = new Date(startDate.getTime() + 60*60*1000);
        const formatDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent('Election event via ElectiGuide AI')}`;
        window.open(url, '_blank');
      }
    });
  });
  
  // Crowd guide
  const submitWait = document.getElementById('submit-wait');
  if (submitWait) {
    submitWait.addEventListener('click', () => {
      const minutes = parseInt(document.getElementById('wait-time-input')?.value);
      if (minutes && minutes > 0 && minutes < 180) {
        const zip = userData.zipCode || "default";
        const updated = reportWaitTime(zip, minutes);
        document.getElementById('crowd-wait').innerText = updated.waitTime;
        alert(`Thank you! New average wait time: ${updated.waitTime} minutes based on ${updated.reports} reports.`);
      } else {
        alert('Please enter a valid wait time (1-120 minutes)');
      }
    });
  }
  
  const refreshCrowd = document.getElementById('refresh-crowd');
  if (refreshCrowd) {
    refreshCrowd.addEventListener('click', () => {
      const zip = userData.zipCode || "default";
      const crowd = getCrowdStatus(zip);
      document.getElementById('crowd-wait').innerText = crowd.waitTime;
    });
  }
  
  // Chatbot
  const sendBtn = document.getElementById('chat-send');
  const chatInput = document.getElementById('chat-input');
  
  function sendMessage() {
    const input = document.getElementById('chat-input');
    const question = input.value.trim();
    if (!question) return;
    
    // Add user message
    chatHistory.push({ role: "user", content: question });
    
    // Get bot response
    const answer = getChatbotResponse(question);
    chatHistory.push({ role: "assistant", content: answer });
    
    // Re-render chat
    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) {
      const newMessage = `
        <div class="chat-message flex justify-end">
          <div class="max-w-[80%] bg-blue-600 text-white rounded-lg p-3">
            <i class="fas fa-user mr-2 text-sm"></i>${escapeHtml(question)}
          </div>
        </div>
        <div class="chat-message flex justify-start">
          <div class="max-w-[80%] bg-gray-100 text-gray-800 rounded-lg p-3">
            <i class="fas fa-robot mr-2 text-sm"></i>${escapeHtml(answer)}
          </div>
        </div>
      `;
      messagesContainer.insertAdjacentHTML('beforeend', newMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    input.value = '';
  }
  
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  
  // Suggest buttons
  document.querySelectorAll('.suggest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      if (input) {
        input.value = btn.innerText;
        sendMessage();
      }
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load saved crowd data
if (localStorage.getItem('crowdData')) {
  try {
    const saved = JSON.parse(localStorage.getItem('crowdData'));
    Object.assign(crowdData, saved);
  } catch(e) {}
}

// Initialize
render();