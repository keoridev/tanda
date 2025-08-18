export interface LearningStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  skills: string[];
  resources?: {
    name: string;
    url: string;
  }[];
}

export interface LearningPath {
  profession: string;
  steps: LearningStep[];
}
