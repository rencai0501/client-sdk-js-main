/// <reference types="node" />
import { EventEmitter } from 'events';
import { TrackInfo } from '../../proto/livekit_models';
import LocalAudioTrack from './LocalAudioTrack';
import LocalVideoTrack from './LocalVideoTrack';
import RemoteAudioTrack from './RemoteAudioTrack';
import RemoteVideoTrack from './RemoteVideoTrack';
import { Track } from './Track';
export declare class TrackPublication extends EventEmitter {
    kind: Track.Kind;
    trackName: string;
    trackSid: Track.SID;
    track?: Track;
    source: Track.Source;
    /** MimeType of the published track */
    mimeType?: string;
    /** dimension of the original published stream, video-only */
    dimensions?: Track.Dimensions;
    /** true if track was simulcasted to server, video-only */
    simulcasted?: boolean;
    /** @internal */
    trackInfo?: TrackInfo;
    protected metadataMuted: boolean;
    constructor(kind: Track.Kind, id: string, name: string);
    /** @internal */
    setTrack(track?: Track): void;
    get isMuted(): boolean;
    get isEnabled(): boolean;
    get isSubscribed(): boolean;
    /**
     * an [AudioTrack] if this publication holds an audio track
     */
    get audioTrack(): LocalAudioTrack | RemoteAudioTrack | undefined;
    /**
     * an [VideoTrack] if this publication holds a video track
     */
    get videoTrack(): LocalVideoTrack | RemoteVideoTrack | undefined;
    handleMuted: () => void;
    handleUnmuted: () => void;
    /** @internal */
    updateInfo(info: TrackInfo): void;
}
export declare namespace TrackPublication {
    enum SubscriptionStatus {
        Subscribed = "subscribed",
        NotAllowed = "not_allowed",
        Unsubscribed = "unsubscribed"
    }
}
//# sourceMappingURL=TrackPublication.d.ts.map