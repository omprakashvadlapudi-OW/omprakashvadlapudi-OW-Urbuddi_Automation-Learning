

export class DataGenerator {
  getRandomInt(min: number, max: number): number {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
  }

  getCredentials(name:string){
    const randomNum = this.getRandomInt(100, 999);
    const email:string=`${name}${randomNum}@gmail.com`;
    const password:string=`${name}$@123`;

    return {email,password};
  }

  getFromAndToDate(minAttr:string,maxAttr:string) {
    const minDate = new Date(minAttr);
    const maxDate = new Date(maxAttr);

    let fromDate: Date;
    while (true) {
      const randomTime =
        minDate.getTime() +
        Math.random() * (maxDate.getTime() - minDate.getTime());
      const candidate = new Date(randomTime);

      const day = candidate.getDay();

      if (day >= 1 && day <= 4) {
        fromDate = candidate;
        break;
      }
    }
    const toDate = new Date(fromDate);
    toDate.setDate(fromDate.getDate() + 1);
    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
      fromDate: format(fromDate),
      toDate: format(toDate),
    };
  }

  getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}
}
