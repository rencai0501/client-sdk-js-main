import type LocalAudioTrack from './LocalAudioTrack';
import type LocalVideoTrack from './LocalVideoTrack';
import type RemoteAudioTrack from './RemoteAudioTrack';
import type RemoteVideoTrack from './RemoteVideoTrack';
export declare type RemoteTrack = RemoteAudioTrack | RemoteVideoTrack;
export declare type AudioTrack = RemoteAudioTrack | LocalAudioTrack;
export declare type VideoTrack = RemoteVideoTrack | LocalVideoTrack;
export declare type AdaptiveStreamSettings = {
    /**
     * Set a custom pixel density, defaults to 1
     * When streaming videos on a ultra high definition screen this setting
     * let's you account for the devicePixelRatio of those screens.
     * Set it to `screen` to use the actual pixel density of the screen
     * Note: this might significantly increase the bandwidth consumed by people
     * streaming on high definition screens.
     */
    pixelDensity?: number | 'screen';
    /**
     * If true, video gets paused when switching to another tab.
     * Defaults to true.
     */
    pauseVideoInBackground?: boolean;
};
//# sourceMappingURL=types.d.ts.map