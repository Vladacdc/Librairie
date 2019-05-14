module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id) => {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = () => {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.remove=(id)=>{
        var storedItem = this.items[id];
        if (!storedItem) return;
        this.totalPrice-=storedItem.price;
        this.totalQty-=storedItem.qty;
        delete this.items[id];
    };

    this.setQty=(newQty,id)=>{
      var storedItem = this.items[id];
      if (!storedItem) return;

      this.totalPrice-=storedItem.price;
      this.totalQty-=storedItem.qty;

      storedItem.qty=newQty*1;
      storedItem.price=storedItem.item.price * storedItem.qty

      this.totalQty+= storedItem.qty;
      this.totalPrice+=storedItem.price;
    };
};
