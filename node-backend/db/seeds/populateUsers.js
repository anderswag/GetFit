
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          first_name: 'Kali',
          last_name: 'Muscle',
          username: 'Testuser1',
          email: 'Rawwwwrr@hotmail.com',
          password: '1234',
          picture:'http://gummymall.com/image/cache/data/kalimuscle/km_moneyandmuscle_tank_black-700x700.jpg',
          gym:'GoodLife Fitness, McCaul Street, Toronto, ON, Canada',
          score:8
        }),
        knex('users').insert({
          id: 2,
          first_name: 'Furious',
          last_name: 'Pete',
          username: 'Testuser2',
          email: 'Rrdfr@hotmail.com',
          password: '1234',
          picture:'https://cdn.shopify.com/s/files/1/0158/2502/t/23/assets/bg_newsletter.jpg?15889536651861050936',
          gym:'GoodLife Fitness, McCaul Street, Toronto, ON, Canada',
          score:76
        }),
        knex('users').insert({
          id: 3,
          first_name: 'Sasha',
          last_name: 'Blue',
          username: 'Testuser3',
          email: 'Rawwwasdfasdfasdfafadfsfwrr@hotmail.com',
          password: '1234',
          picture:'http://fullhdpictures.com/wp-content/uploads/2016/08/Fitness-Girl-Desktop.jpg',
          gym:'Toronto Central Grosvenor St. YMCA Centre, Grosvenor Street, Toronto, ON, Canada',
          score:3
        }),
        knex('users').insert({
          id: 4,
          first_name: 'Captain',
          last_name: 'Morgan',
          username: 'Testuser4',
          email: 'Rumxlover@hotmail.com',
          password: '1234',
          picture:'https://pbs.twimg.com/profile_images/714839430238969857/L8A9XPFX.jpg',
          gym:'Toronto Central Grosvenor St. YMCA Centre, Grosvenor Street, Toronto, ON, Canada',
          score:152
        }),
        knex('users').insert({
          id: 5,
          first_name: 'Saladora',
          last_name: 'Slayer',
          username: 'Testuser5',
          email: 'saladlover@hotmail.com',
          password: '1234',
          picture:'https://thumbs.dreamstime.com/z/young-woman-eating-vegetable-salad-isolated-white-background-29713369.jpg',
          gym:'Toronto Central Grosvenor St. YMCA Centre, Grosvenor Street, Toronto, ON, Canada',
          score:22
        })
      ]);
    });
};
