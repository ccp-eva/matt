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
			completed: boolean;
		};
		sBallPractice: {
			duration: number;
			explanationCount: number;
			order: string[];
			inner: string;
			middle: string;
			outer: string;
			completed: boolean;
		};
		sTask: {
			duration: number;
			completed: boolean;
			man: string;
			woman: string;
			child: string;
			elderly: string;
			chicken?: string;
			pig?: string;
			dog?: string;
			sheep?: string;
			goldfish?: string;
			cow?: string;
			rabbit?: string;
			cat?: string;
		};
	};
};
