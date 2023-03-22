declare module '*.yaml' {
	const content: any;
	export default content;
}

declare module '*.md' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.gif' {
	const content: any;
	export default content;
}

declare module '*.mp3' {
	const content: any;
	export default content;
}

declare module '*.webm' {
	const content: any;
	export default content;
}

declare var data: {
	id: string;
	culture: string;
	agegroup: 'child' | 'adult';
	input: 'audio' | 'text' | 'userchoice';
	initialTimestamp: string;
	totalSlides: number;
	slideCounter: number;
	previousSlide: string;
	currentSlide: string;
	nextSlide: string;
	slideOrder: string[];
	animalSlideCounter: number;
	totalAnimalSlides: number;
	animalOrder: string[];
	gender: 'female' | 'male' | 'other';
	birthday: 'string';
	procedure: {
		sIntroduction: {
			duration: number;
		};
		sHuman: {
			duration: number;
			response: string;
		};
		sCow: {
			duration: number;
			response: string;
		};
		sPig: {
			duration: number;
			response: string;
		};
		sSheep: {
			duration: number;
			response: string;
		};
		sChicken: {
			duration: number;
			response: string;
		};
		sCat: {
			duration: number;
			response: string;
		};
		sDog: {
			duration: number;
			response: string;
		};
		sRabbit: {
			duration: number;
			response: string;
		};
		sGoldfish: {
			duration: number;
			response: string;
		};
		sMcIntro: {
			completed: boolean;
		};
		sBallAnimation: {
			order: string[];
			completed: boolean;
		};
		sBallPractice: {
			duration: number;
			addExplanationCount: number;
			order: string[];
			inner: string;
			middle: string;
			outer: string;
			completed: boolean;
		};
		sTask: {
			duration: number;
			knownAnimals: string[];
			unknownAnimals: string[];
			human: string;
			chicken?: string;
			pig?: string;
			dog?: string;
			sheep?: string;
			goldfish?: string;
			cow?: string;
			rabbit?: string;
			cat?: string;
			assignedAnimals: number;
			comprehension: {
				completed: boolean;
				order: string[];
				inner: boolean;
				middle: boolean;
				outer: boolean;
			};
		};
		sMeaning: {
			duration: number;
			textInput: string;
			isText: boolean;
			isVoice: boolean;
			voiceExplanation: boolean;
		};
		sPracticeDilemma: {
			duration: number;
			response: string;
			completed: boolean;
		};
		s1Hu1Co: {
			duration: number;
			response: string;
		};
		sQuThoughtsComp: {
			response: string;
		};
		sQuFeelingsComp: {
			response: string;
		};
		sQuRankingIntelligence: {
			response: string;
			duration: number;
			cow: 0 | 1 | 2 | 3 | 4;
			cat: 0 | 1 | 2 | 3 | 4;
			human: 0 | 1 | 2 | 3 | 4;
		};
		sQuRankingPain: {
			response: string;
			duration: number;
			cow: 0 | 1 | 2 | 3 | 4;
			cat: 0 | 1 | 2 | 3 | 4;
			human: 0 | 1 | 2 | 3 | 4;
		};
		sQuRankingFeelings: {
			response: string;
			duration: number;
			cow: 0 | 1 | 2 | 3 | 4;
			cat: 0 | 1 | 2 | 3 | 4;
			human: 0 | 1 | 2 | 3 | 4;
		};
		sQuRankingSimilarity: {
			response: string;
			duration: number;
			cow: 0 | 1 | 2 | 3 | 4;
			cat: 0 | 1 | 2 | 3 | 4;
		};
		sQuRankingExposure: {
			response: string;
			duration: number;
			cow: 0 | 1 | 2 | 3 | 4;
			cat: 0 | 1 | 2 | 3 | 4;
		};
		sReasoning1Hu1Co: {
			response: string;
			duration: number;
			textInput: string;
			isText: boolean;
			isVoice: boolean;
			voiceExplanation: boolean;
		};
	};
};
