export type ITask = {
    id: number;
    title: string;
    description: string;
    url: string;
    href?: string;
    subtasks?: number[];
    reward: number;
    reward_in_tappy: number;
    checking: TypeChecking;
    bannerUrl: string;
    bannerTitle: string;
    bannerDescription: string;
    isDone: boolean;
    action: {
        action_title: string;
        socnet: string;
    };
    link_to_banner: string;
};

/* type Action = {
	action_title: string;
	socnet: string;
  };
  
export type ITask = {
	id: number;
	title: string;
	url: string;
	href: string;
	reward: number;
	reward_in_tappy: number;
	subtasks: number[];
	isDone: boolean;
	action: Action;
  }; */
export type IFriend = {
	id: number;
	title: string;
	url?: string;
	coin: number;
};

export type TypeChecking = 'default' | 'check' | 'checking' | 'completed';
