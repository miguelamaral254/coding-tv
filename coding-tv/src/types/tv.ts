interface TVStatus {
    isOn: boolean;
    volume: number;
    channel: number;
  }
  
  class TV {
    private isOn: boolean;
    private volume: number;
    private channel: number;
  
    constructor() {
      this.isOn = false;
      this.volume = 10;
      this.channel = 1;
    }
  
    turnOnOff(): void {
      this.isOn = !this.isOn;
      this.showStatus();
    }
  
    increaseVolume(): void {
      if (this.isOn && this.volume < 100) {
        this.volume += 1;
      }
      this.showStatus();
    }
  
    decreaseVolume(): void {
      if (this.isOn && this.volume > 0) {
        this.volume -= 1;
      }
      this.showStatus();
    }
  
    setChannel(channel: number): void {
      if (this.isOn && channel > 0 && channel <= 999) {
        this.channel = channel;
      }
      this.showStatus();
    }
  
    showStatus(): void {
      console.log(`TV is ${this.isOn ? "ON" : "OFF"}, Channel: ${this.channel}, Volume: ${this.volume}`);
    }
  
    getStatus(): TVStatus {
      return {
        isOn: this.isOn,
        volume: this.volume,
        channel: this.channel,
      };
    }
  }
  
  export default TV;
  