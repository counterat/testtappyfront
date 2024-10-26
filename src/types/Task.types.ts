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

export const AdTask : ITask = {
  id:999,
  title: 'Watch the ads!',
  description: 'Watch the ads and get ticket reward!',
  url: '/assets/ads.png',
 
 
  reward: 1000,
  reward_in_tappy: 0,
  checking: 'default',
  bannerUrl: '/assets/ads.png',
  bannerTitle: 'Watch the ads!',
  bannerDescription: 'Watch the ads and get ticket reward!',
  isDone: false,
  action: {
      action_title: 's',
      socnet: 's',
  },
  link_to_banner: '/assets/ads.png',
}


export const InviteTask : ITask = {
  id:999,
  title: 'Invite 5 friends',
  description: 'Invite 5 new friends and get instant reward in TON!',
  url: '/assets/icon tappy.png',
 
 
  reward: 1000,
  reward_in_tappy: 0,
  checking: 'default',
  bannerUrl: '/assets/icon tappy.png',
  bannerTitle: 'Invite 5 friends',
  bannerDescription: 'Invite 5 new friends and get instant reward in TON!',
  isDone: false,
  action: {
      action_title: 's',
      socnet: 's',
  },
  link_to_banner: '/assets/icon tappy.png',
}

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
