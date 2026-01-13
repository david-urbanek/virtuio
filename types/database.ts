export type VRHeadset = {
  id: string;
  name: string;
  daily_rate: number;
};

export type Reservation = {
  id: string;
  headset_id: string;
  start_time: string;
  end_time: string;
};
