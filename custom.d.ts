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
	slideCount: number;
	gender: 'female' | 'male' | 'other';
	birthday: 'string';
	procedure: {
		introduction: {
			duration: number;
		};
		humans: {
			completed: boolean;
		};
		cow: {
			duration: number;
			response: string;
		};
		pig: {
			duration: number;
			response: string;
		};
		sheep: {
			duration: number;
			response: string;
		};
		chicken: {
			duration: number;
			response: string;
		};
		cat: {
			duration: number;
			response: string;
		};
		dog: {
			duration: number;
			response: string;
		};
		rabbit: {
			duration: number;
			response: string;
		};
		goldfish: {
			duration: number;
			response: string;
		};
		mcIntro: {
			completed: boolean;
		};
		ballAnimation: {
			completed: boolean;
		};
		ballPractice: {
			duration: number;
			explanationCount: number;
			order: string[];
			inner: string;
			middle: string;
			outer: string;
			completed: boolean;
		};
		task: {
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
