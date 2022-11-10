import { ClientInfo } from '../proto/livekit_models';
export declare function unpackStreamId(packed: string): string[];
export declare function sleep(duration: number): Promise<void>;
export declare function isFireFox(): boolean;
export declare function isSafari(): boolean;
export declare function isMobile(): boolean;
export declare function isWeb(): boolean;
export declare const getResizeObserver: () => ResizeObserver;
export declare const getIntersectionObserver: () => IntersectionObserver;
export interface ObservableMediaElement extends HTMLMediaElement {
    handleResize: (entry: ResizeObserverEntry) => void;
    handleVisibilityChanged: (entry: IntersectionObserverEntry) => void;
}
export declare function getClientInfo(): ClientInfo;
export declare function getEmptyVideoStreamTrack(): MediaStreamTrack;
export declare function getEmptyAudioStreamTrack(): MediaStreamTrack;
export declare class Future<T> {
    promise: Promise<T>;
    resolve: (arg: T) => void;
    reject: (e: any) => void;
    constructor();
}
//# sourceMappingURL=utils.d.ts.map