import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await turnPizzasIntoPages(params);
  // 2. Toppings

  // 3. Slicemasters
}
