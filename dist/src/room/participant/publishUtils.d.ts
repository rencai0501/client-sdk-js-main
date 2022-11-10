import LocalAudioTrack from '../track/LocalAudioTrack';
import LocalVideoTrack from '../track/LocalVideoTrack';
import { TrackPublishOptions, VideoEncoding, VideoPreset } from '../track/options';
/** @internal */
export declare function mediaTrackToLocalTrack(mediaStreamTrack: MediaStreamTrack, constraints?: MediaTrackConstraints): LocalVideoTrack | LocalAudioTrack;
export declare const presets169: VideoPreset[];
export declare const presets43: VideoPreset[];
export declare const presetsScreenShare: VideoPreset[];
export declare const defaultSimulcastPresets169: VideoPreset[];
export declare const defaultSimulcastPresets43: VideoPreset[];
export declare const computeDefaultScreenShareSimulcastPresets: (fromPreset: VideoPreset) => VideoPreset[];
export declare function computeVideoEncodings(isScreenShare: boolean, width?: number, height?: number, options?: TrackPublishOptions): RTCRtpEncodingParameters[];
export declare function determineAppropriateEncoding(isScreenShare: boolean, width: number, height: number): VideoEncoding;
export declare function presetsForResolution(isScreenShare: boolean, width: number, height: number): VideoPreset[];
export declare function defaultSimulcastLayers(isScreenShare: boolean, original: VideoPreset): VideoPreset[];
/** @internal */
export declare function sortPresets(presets: Array<VideoPreset> | undefined): VideoPreset[] | undefined;
//# sourceMappingURL=publishUtils.d.ts.map