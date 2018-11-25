namespace Helpers {
    export class Helper {
        static cloneObject(obj: any): any {
            const clonedObj = (<any>Object).assign({}, obj);
            return clonedObj;
        }
    }
}
