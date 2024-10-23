export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

export interface Track {
  id: string;
  title: string;
  description?: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  waveformData: number[];
  userId: string;
  user: User;
  plays: number;
  likes: number;
  commentsCount: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  timestamp: number;
  userId: string;
  user: User;
  trackId: string;
  createdAt: string;
}