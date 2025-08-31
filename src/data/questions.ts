import { Question } from '../types/test';

export const questions: Question[] = [
  {
    id: 1,
    text: {
      ko: "깊은 밤, 당신은 혼자 집에 있습니다. 갑자기 정전이 되고 어둠 속에서 낯선 발소리가 들립니다. 낯선 발소리는 누구인가?",
      en: "Late at night, you're alone at home. Suddenly there's a power outage and you hear strange footsteps in the darkness. Who do you think is making the strange footsteps?"
    },
    image: "/images/house-2601655_1280.jpg", // 어두운 집 이미지
    options: {
      ko: ["도둑", "바람 소리", "직장 상사"],
      en: ["A thief", "Wind sounds", "My boss"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 2,
    text: {
      ko: "당신이 가장 소중히 여기는 사람이 배신했습니다. 그들은 당신의 비밀을 모든 사람에게 퍼뜨렸습니다. 당신은 어떻게 하시겠습니까?",
      en: "The person you cherish most has betrayed you. They've spread your secrets to everyone. What would you do?"
    },
    image: "/images/mask-1641264_1280.jpg", // 배신/어둠 관련 이미지로 교체 필요
    options: {
      ko: ["관계를 끊고 멀어진다", "그들도 같은 고통을 느껴야 한다", "친하게 지내려고 노력한다"],
      en: ["Cut ties and distance myself", "They should feel the same pain", "Try to maintain a friendly relationship"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 3,
    text: {
      ko: "병원에서 당신은 우연히 한 의사가 환자의 차트를 조작하는 것을 목격했습니다. 그 환자는 당신이 싫어하는 사람입니다. 당신의 행동은?",
      en: "At a hospital, you accidentally witness a doctor manipulating a patient's chart. The patient is someone you dislike. What is your action?"
    },
    image: "/images/hospital-921034_1280.jpg", // 병원/의료 관련 어두운 이미지로 교체 필요
    options: {
      ko: ["즉시 신고한다", "모른 척하고 지나간다", "몰래 녹화한다"],
      en: ["Report it immediately", "Pretend not to know and pass by", "Secretly record it"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 4,
    text: {
      ko: "깊은 숲 속에서 길을 잃었습니다. 멀리서 누군가의 비명소리가 들립니다. 비명소리는 누구인가?",
      en: "You're lost deep in the forest. You hear someone screaming in the distance. Who is making the screaming sound?"
    },
    image: "/images/forest-7543646_1280.jpg", // 어두운 숲 이미지로 교체 필요
    options: {
      ko: ["주위를 두리번 거리는 사람", "다리를 부여잡고 있는 사람", "당신을 쳐다보고 있는 사람"],
      en: ["A person looking around anxiously", "A person clutching their leg", "A person staring at you"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 5,
    text: {
      ko: "당신은 완벽한 범죄를 계획할 수 있는 천재적인 능력을 갖게 되었습니다. 하지만 이 능력을 사용하면 무고한 사람들이 피해를 볼 수 있습니다. 당신은?",
      en: "You've gained the genius ability to plan perfect crimes. But using this ability could harm innocent people. You:"
    },
    image: "/images/hacker-3342696_1280.jpg", // 어둠/범죄 관련 이미지로 교체 필요
    options: {
      ko: ["능력을 사용하지 않는다", "원하는 것을 얻기 위해 사용한다", "호기심에 능력을 사용해본다"],
      en: ["Don't use the ability", "Use it to get what you want", "Use it out of curiosity"]
    },
    scoring: [0, 1, 2]
  }
];
