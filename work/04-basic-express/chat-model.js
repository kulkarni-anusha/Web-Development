const users = {
  "Amit": { name: "Amit", avatar: "/images/avatar1.jpg"  },
  "Bao": { name: "Bao", avatar: "/images/avatar2.jpg" },
  "Mark": { name: "Mark", avatar: "/images/avatar3.jpg" },
  "Tim": { name: "Tim", avatar: "/images/avatar4.jpg" }
};

const messages = [
  {
    sender: "Amit",
    text: "You all up?",
    avatar: users.Amit.avatar
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    avatar: users.Bao.avatar
  },
  {
    sender: "Mark",
    text: "I'm still working on it. Also, send me those cat videos ",
    avatar: users.Mark.avatar
  },
  {
    sender: "Tim",
    text: "Hahah! Just finished mine",
    avatar: users.Tim.avatar
  }
];


function addMessage({ sender, text }) { 
  const user = users[sender];
  messages.push({
    sender,
    text: text.trim(),
    avatar: user.avatar
  });
}

const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;

