const app = Vue.createApp({
    data(){
        return {
            title:"Contador App - Vue",
            count:0
        }
    },
    methods:{
        modCount(instruction = "add"){ 
            if(instruction === "dis"){
                this.count -= 1 
            }else{
                this.count += 1 
            }
            
        },

    }
});