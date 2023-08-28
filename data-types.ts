export type BodyProp = {
  user_uuid: string;
  user_name: string;
  room_uuid: string;
  room_name: string;
  password?: string;
  approved: boolean;
  creator_uuid: string;
  is_creator: boolean;
  video_enabled: boolean;
  sound_enabled: boolean;
  participant_timeline_enabled: boolean;
  cam_timeline_enabled: boolean;
  face_timeline_enabled: boolean;
  lobby_enabled: boolean;
  started_at: string;
};

export type TokenDataProp = {
  room_uuid: string;
  user_uuid: string;
  password?: string | undefined;
}

export type WsMessageProp =
  | { type: "opening"; data: { room_uuid: string; user_uuid: string } }
  | { type: "initReceive"; data: { user_uuid: string } }
  | { type: "initSend"; data: { user_uuid: string } }
  | { type: "signal"; data: { user_uuid: string; signal: unknown } }
  | {
      type: "userStatus";
      data: { user_uuid: string; status: "online" | "offline" };
    }
  | { type: "toggleVideo"; data: { user_uuid: string; videoEnabled: boolean } }
  | { type: "toggleAudio"; data: { user_uuid: string; audioEnabled: boolean } }
  | { type: "errorToken"; data: Record<string | number | symbol, never> }
  | { type: "errorPassword"; data: Record<string | number | symbol, never> }
  | { type: "full"; data: Record<string | number | symbol, never> }
  | { type: "chat"; data: { user_uuid: string; message: string } };

export type RoomProp = {
  uuid: string;
  name: string;
  creator_uuid: string;
  password?: string;
  video_enabled: boolean;
  sound_enabled: boolean;
  participant_timeline_enabled: boolean;
  cam_timeline_enabled: boolean;
  face_timeline_enabled: boolean;
  lobby_enabled: boolean;
  started_at: number;
  ended_at: number | null;

  participants: Record<string, ParticipantProp>;
  chats: { user_uuid: string; message: string }[];
  
  last_active_at: number;
  updated_at?: number;
  created_at: number;
};

export type ParticipantProp = {
  uuid: string;
  name: string;
  approved: boolean;
  is_creator: boolean;
  video_enabled: boolean;
  sound_enabled: boolean;
  socket: WebSocket | null;
  status: "online" | "offline";
  timelines: {
    start_at: number;
    end_at?: number;
  }[];
  cam_timelines: [];
  face_timelines: [];
  updated_at?: number;
  created_at: number;
};
