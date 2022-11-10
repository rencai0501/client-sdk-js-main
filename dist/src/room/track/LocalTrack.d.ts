import { VideoCodec } from './options';
import { Track } from './Track';
export default class LocalTrack extends Track {
    /** @internal */
    sender?: RTCRtpSender;
    /** @internal */
    codec?: VideoCodec;
    protected constraints: MediaTrackConstraints;
    protected wasMuted: boolean;
    protected reacquireTrack: boolean;
    protected providedByUser: boolean;
    protected constructor(mediaTrack: MediaStreamTrack, kind: Track.Kind, constraints?: MediaTrackConstraints, userProvidedTrack?: boolean);
    get id(): string;
    get dimensions(): Track.Dimensions | undefined;
    private _isUpstreamPaused;
    get isUpstreamPaused(): boolean;
    get isUserProvided(): boolean;
    /**
     * @returns DeviceID of the device that is currently being used for this track
     */
    getDeviceId(): Promise<string | undefined>;
    mute(): Promise<LocalTrack>;
    unmute(): Promise<LocalTrack>;
    replaceTrack(track: MediaStreamTrack, userProvidedTrack?: boolean): Promise<LocalTrack>;
    protected restart(constraints?: MediaTrackConstraints): Promise<LocalTrack>;
    protected setTrackMuted(muted: boolean): void;
    protected get needsReAcquisition(): boolean;
    protected handleAppVisibilityChanged(): Promise<void>;
    private handleEnded;
    pauseUpstream(): Promise<void>;
    resumeUpstream(): Promise<void>;
}
//# sourceMappingURL=LocalTrack.d.ts.map