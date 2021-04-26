class Subject {
    constructor() {

        this.observers = [];

        return {
            observers: this.observers,
            subscribeObserver: this.subscribeObserver,
            unsubscribeObserver: this.unsubscribeObserver,
            notifyObserver: this.notifyObserver,
            notifyAllObservers: this.notifyAllObservers
        };
    }

    subscribeObserver = (observer) => {
        return this.observers.push(observer);
    }

    unsubscribeObserver = (observer) =>{
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
        return this;
    }

    notifyObserver = (observer) => {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers[index].notify(index);
        }
        return this;
    }

    notifyAllObservers = () => {
        for (let i = 0; i < this.observers.length; i++) {
            this.observers[i].notify(i);
        }

        return this;
    }

}

class Observer {
    constructor(){
        return{
            notify:this.notify
        }
    }

    notify = (index) =>{
        console.log("Observer " + index + " is notified!");
        return this;
    }
}

var subject = new Subject();

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
var observer4 = new Observer();


subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);

subject.notifyObserver(observer2);

subject.notifyAllObservers();