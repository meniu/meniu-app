export default {
    restaurants:[{name:"Super Duper", description:"restaurante hamburguesas", rating:5, type:"restaurant",
            backgroundUri:"https://i1.wp.com/gruposiso.es/wp-content/uploads/2017/04/grey-white-background.jpg", uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-1.png",},
        {name:"Polliseria", description:"restaurante pollos", rating:4.5, type:"restaurant",
                backgroundUri:"https://i1.wp.com/gruposiso.es/wp-content/uploads/2017/04/grey-white-background.jpg", uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-2.png",},
        {name:"One Burrito", description:"restaurante burritos", rating:3.5, type:"restaurant",
                backgroundUri:"https://i1.wp.com/gruposiso.es/wp-content/uploads/2017/04/grey-white-background.jpg", uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-3.png",},
        {name:"Flügel", description:"restaurante alitas", rating:4, type:"restaurant",
                backgroundUri:"https://i1.wp.com/gruposiso.es/wp-content/uploads/2017/04/grey-white-background.jpg", uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-4.png",},
        {name:"Próximamente", description:"restaurante pendiente", rating:5, type:"restaurant",
                backgroundUri:"https://i1.wp.com/gruposiso.es/wp-content/uploads/2017/04/grey-white-background.jpg", uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-5.png",},
    ],
    promotions:[
        {name:"Chilaquiles", description:"Deliciosos Chilaquiles", rating:4,discount:1000, type:"deluxe",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"Burrito", description:"Delicioso Burrito", rating:4.5,discount:1000, type:"premium",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"Taco", description:"Delicioso Taco", rating:5,discount:1000, type:"basic",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    ],
    spentPromotions:[
        {name:"Sushi", description:"Delicioso Sushi", rating:4,discount:4000, type:"deluxe", transactionDate: "13-03-2019",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"Ramen", description:"Delicioso Ramen", rating:4.5,discount:3000, type:"premium", transactionDate: "11-03-2019",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"wok", description:"Delicioso wok", rating:5,discount:2000, type:"basic", transactionDate: "18-03-2019",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"tamal", description:"Delicioso tamal", rating:5,discount:5000, type:"basic", transactionDate: "18-04-2019",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {name:"envuelto", description:"Delicioso envuelto", rating:5,discount:1000, type:"deluxe", transactionDate: "18-05-2019",
            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
    ],
    monthMemberships:[
        {
            name:"Guerrero", price:210000, description:"Para ahorrar en grande", monthDuration:1,
            coupons:[{type:"basic", quantity:20}]
        },
        {
            name:"Premium", price:250000, description:"Almuerza como alto ejecutivo", monthDuration:1,
            coupons:[{type:"premium", quantity:20},]
        },
        {
            name:"Deluxe", price:290000, description:"Lo mejor de lo mejor, siempre", monthDuration:1,
            coupons:[{type:"deluxe", quantity:20},]
        },
        {
            name:"Personalizado", price:270000, description:"A tu medida", monthDuration:1,
            coupons:[{type:"basic", quantity:10},{type:"premium", quantity:5},{type:"deluxe", quantity:5},]
        },
    ],
    twoWeekMemberships:[
        {
            name:"Guerrero", price:105000, description:"Para ahorrar en grande", monthDuration:2,
            coupons:[{type:"basic", quantity:10}]
        },
        {
            name:"Premium", price:125000, description:"Almuerza como alto ejecutivo", monthDuration:2,
            coupons:[{type:"premium", quantity:10},]
        },
        {
            name:"Deluxe", price:145000, description:"Lo mejor de lo mejor, siempre", monthDuration:2,
            coupons:[{type:"deluxe", quantity:10},]
        },
        {
            name:"Personalizado", price:135000, description:"A tu medida", monthDuration:2,
            coupons:[{type:"basic", quantity:5},{type:"premium", quantity:4},{type:"deluxe", quantity:6},]
        },
    ],
}