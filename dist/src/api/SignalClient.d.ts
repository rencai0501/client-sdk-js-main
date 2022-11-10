import { ParticipantInfo, Room, SpeakerInfo, VideoLayer } from '../proto/livekit_models';
import { AddTrackRequest, ConnectionQualityUpdate, JoinResponse, LeaveRequest, SessionDescription, SignalRequest, SignalTarget, SimulateScenario, StreamStateUpdate, SubscribedQualityUpdate, SubscriptionPermissionUpdate, SyncState, TrackPermission, TrackPublishedResponse, TrackUnpublishedResponse, UpdateSubscription, UpdateTrackSettings } from '../proto/livekit_rtc';
import Queue from './RequestQueue';
import 'webrtc-adapter';
interface ConnectOpts {
    autoSubscribe?: boolean;
    /** internal */
    reconnect?: boolean;
    publishOnly?: string;
    adaptiveStream?: boolean;
}
export interface SignalOptions {
    autoSubscribe?: boolean;
    publishOnly?: string;
    adaptiveStream?: boolean;
}
/** @internal */
export declare class SignalClient {
    isConnected: boolean;
    isReconnecting: boolean;
    requestQueue: Queue;
    useJSON: boolean;
    /** simulate signaling latency by delaying messages */
    signalLatency?: number;
    onClose?: (reason: string) => void;
    onAnswer?: (sd: RTCSessionDescriptionInit) => void;
    onOffer?: (sd: RTCSessionDescriptionInit) => void;
    onTrickle?: (sd: RTCIceCandidateInit, target: SignalTarget) => void;
    onParticipantUpdate?: (updates: ParticipantInfo[]) => void;
    onLocalTrackPublished?: (res: TrackPublishedResponse) => void;
    onNegotiateRequested?: () => void;
    onSpeakersChanged?: (res: SpeakerInfo[]) => void;
    onRemoteMuteChanged?: (trackSid: string, muted: boolean) => void;
    onRoomUpdate?: (room: Room) => void;
    onConnectionQuality?: (update: ConnectionQualityUpdate) => void;
    onStreamStateUpdate?: (update: StreamStateUpdate) => void;
    onSubscribedQualityUpdate?: (update: SubscribedQualityUpdate) => void;
    onSubscriptionPermissionUpdate?: (update: SubscriptionPermissionUpdate) => void;
    onLocalTrackUnpublished?: (res: TrackUnpublishedResponse) => void;
    onTokenRefresh?: (token: string) => void;
    onLeave?: (leave: LeaveRequest) => void;
    ws?: WebSocket;
    constructor(useJSON?: boolean);
    join(url: string, token: string, opts?: SignalOptions, abortSignal?: AbortSignal): Promise<JoinResponse>;
    reconnect(url: string, token: string): Promise<void>;
    connect(url: string, token: string, opts: ConnectOpts, abortSignal?: AbortSignal): Promise<JoinResponse | void>;
    close(): void;
    sendOffer(offer: RTCSessionDescriptionInit): void;
    sendAnswer(answer: RTCSessionDescriptionInit): void;
    sendIceCandidate(candidate: RTCIceCandidateInit, target: SignalTarget): void;
    sendMuteTrack(trackSid: string, muted: boolean): void;
    sendAddTrack(req: AddTrackRequest): void;
    sendUpdateTrackSettings(settings: UpdateTrackSettings): void;
    sendUpdateSubscription(sub: UpdateSubscription): void;
    sendSyncState(sync: SyncState): void;
    sendUpdateVideoLayers(trackSid: string, layers: VideoLayer[]): void;
    sendUpdateSubscriptionPermissions(allParticipants: boolean, trackPermissions: TrackPermission[]): void;
    sendSimulateScenario(scenario: SimulateScenario): void;
    sendLeave(): Promise<void>;
    sendRequest(req: SignalRequest, fromQueue?: boolean): Promise<void>;
    private handleSignalResponse;
    setReconnected(): void;
    private handleWSError;
}
export declare function toProtoSessionDescription(rsd: RTCSessionDescription | RTCSessionDescriptionInit): SessionDescription;
export {};
//# sourceMappingURL=SignalClient.d.ts.map