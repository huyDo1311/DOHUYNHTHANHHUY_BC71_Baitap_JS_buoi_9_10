class StaffList  {
    list = [];
    constructor() {
        this.list = [];
    }
    addStaffMethod(staffObject) {
        this.list.push(staffObject);
    }
    findIndexMethod(id) {
        var indexItem = -1;
        this.list.map(function(item, index) {
            if(item.id === id){
                indexItem = index;
            }
        })
        return indexItem;
    }
    deleteStaffMethod(id) {
        var indexItem = this.findIndexMethod(id)

        if(indexItem > -1){
            this.list.splice(indexItem,1);
        } else {
            alert("Can't delete item");
        }
    }
    getStaffMethod(id) {
        var indexItem = this.findIndexMethod(id);

        if(indexItem > -1){
            return this.list[indexItem];
        }else {
            alert("Can't get item");
        }
    }
    editStaffMethod(id, updateInfo) {
        var indexItem = this.findIndexMethod(id);
        
        if(indexItem > -1) {
            const staff = this.list[indexItem];
            for (const key in updateInfo){
                if(staff.hasOwnProperty(key)){
                    staff[key] = updateInfo[key];
                }
            }
        } else {
            alert("Can't edit item");
        }
    }
}



