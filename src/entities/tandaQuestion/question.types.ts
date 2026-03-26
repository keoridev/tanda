// В types или в файле, где определены Question и Option
export interface SkillScore {
  [key: string]: number;
}

export interface BackendOption {
  id: number;
  value: string;
  text: string;
  skill1: number;
  skill2: number;
  skill3: number;
  skill4: number;
  skill5: number;
  skill6: number;
  question: number;
}

export interface BackendQuestion {
  id?: number;
  text: string;
  options: BackendOption[];
}

export interface TransformedOption {
  value: string;
  text: string;
  skills: SkillScore;
}

export interface TransformedQuestion {
  question: string;
  options: TransformedOption[];
}

export interface QuestionsData {
  questions: TransformedQuestion[];
}