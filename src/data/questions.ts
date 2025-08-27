import { Question } from '../types/test';

export const questions: Question[] = [
  {
    id: 1,
    text: {
      ko: "깊은 밤, 당신은 혼자 집에 있습니다. 갑자기 정전이 되고 어둠 속에서 낯선 발소리가 들립니다. 당신의 첫 번째 생각은?",
      en: "Late at night, you're alone at home. Suddenly there's a power outage and you hear strange footsteps in the darkness. What's your first thought?"
    },
    image: "/images/house-2601655_1280.jpg", // 어두운 집 이미지
    options: {
      ko: ["누군가 도움이 필요한 것 같다", "전기 문제일 가능성이 높다", "침입자를 제압할 방법을 생각한다"],
      en: ["Someone might need help", "It's probably an electrical issue", "Think of ways to subdue the intruder"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 2,
    text: {
      ko: "당신이 가장 소중히 여기는 사람이 배신했습니다. 그들은 당신의 비밀을 모든 사람에게 퍼뜨렸습니다. 당신은 어떻게 하시겠습니까?",
      en: "The person you care about most has betrayed you. They've spread your secrets to everyone. What do you do?"
    },
    image: "/images/mask-1641264_1280.jpg", // 배신/어둠 관련 이미지로 교체 필요
    options: {
      ko: ["시간이 지나면 용서할 수 있을 것이다", "관계를 끊고 멀어진다", "그들도 같은 고통을 느껴야 한다"],
      en: ["I could forgive them given time", "Cut ties and distance myself", "They should feel the same pain"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 3,
    text: {
      ko: "병원에서 당신은 우연히 한 의사가 환자의 차트를 조작하는 것을 목격했습니다. 그 환자는 당신이 싫어하는 사람입니다. 당신의 행동은?",
      en: "At a hospital, you accidentally witness a doctor manipulating a patient's chart. The patient is someone you dislike. What do you do?"
    },
    image: "/images/hospital-921034_1280.jpg", // 병원/의료 관련 어두운 이미지로 교체 필요
    options: {
      ko: ["즉시 신고한다", "모른 척하고 지나간다", "상황을 지켜본 후 필요시 이용한다"],
      en: ["Report it immediately", "Pretend I didn't see anything", "Watch the situation and use it if needed"]
    },
    scoring: [0, 1, 2]
  },
  {
    id: 4,
    text: {
      ko: "깊은 숲 속에서 길을 잃었습니다. 멀리서 누군가의 비명소리가 들립니다. 하지만 그 방향으로 가면 더 깊이 길을 잃을 수도 있습니다. 당신의 선택은?",
      en: "You're lost deep in the forest. You hear someone screaming in the distance. But going in that direction might get you even more lost. What's your choice?"
    },
    image: "/images/forest-7543646_1280.jpg", // 어두운 숲 이미지로 교체 필요
    options: {
      ko: ["위험을 무릅쓰고 도움을 주러 간다", "안전한 길을 찾아 나중에 신고한다", "소리를 무시하고 자신의 안전을 우선한다"],
      en: ["Risk it and go help", "Find a safe way out and report later", "Ignore the sound and prioritize my safety"]
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
      ko: ["이 능력을 선한 목적으로만 사용한다", "능력을 봉인하고 평범하게 산다", "세상은 약육강식, 능력을 최대한 활용한다"],
      en: ["Use this ability only for good purposes", "Seal the ability and live normally", "The world is survival of the fittest, maximize the ability"]
    },
    scoring: [0, 1, 2]
  }
];
