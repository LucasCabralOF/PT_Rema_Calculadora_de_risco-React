export interface IntakeParameters {
  C: number;
  IR: number;
  EF: number;
  ED: number;
  BW: number;
  AT: number;
}

export interface RiskResult {
  I: number;
  QR: number;
  risk: string;
}

export interface Contaminant {
  name: string;
  rfd: number;
}