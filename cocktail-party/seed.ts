const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const categoryNames = [
  'Classic',
  'Stirred',
  'Shaken',
  'Herbal',
  'Tiki',
  'Sour',
  'Fizz',
  'Martini',
  'Margarita',
  'Daiquiri',
  'Old Fashioned',
  'Manhattan',
  'Gin and Tonic',
  'Mojito',
  'Moscow Mule',
  'Negroni',
]

const ingredients = [
  { name: "Vodka", category: "Base spirits" },
  { name: "Gin", category: "Base spirits" },
  { name: "Rum", category: "Base spirits" },
  { name: "White rum", category: "Base spirits" },
  { name: "Dark rum", category: "Base spirits" },
  { name: "Tequila", category: "Base spirits" },
  { name: "Whiskey", category: "Base spirits" },
  { name: "Rye whiskey", category: "Base spirits" },
  { name: "Bourbon", category: "Base spirits" },
  { name: "Scotch", category: "Base spirits" },
  { name: "Brandy", category: "Base spirits" },
  { name: "Cognac", category: "Base spirits" },
  { name: "Mezcal", category: "Base spirits" },
  { name: "Pisco", category: "Base spirits" },
  { name: "Absinthe", category: "Base spirits" },

  { name: "Cointreau", category: "Liqueurs" },
  { name: "Orange Curaçao", category: "Liqueurs" },
  { name: "Triple Sec", category: "Liqueurs" },
  { name: "Grand Marnier", category: "Liqueurs" },
  { name: "St-Germain", category: "Liqueurs" },
  { name: "Campari", category: "Liqueurs" },
  { name: "Baileys Irish Cream", category: "Liqueurs" },
  { name: "Coffee liqueur", category: "Liqueurs" },
  { name: "Aperol", category: "Liqueurs" },
  { name: "Frangelico", category: "Liqueurs" },
  { name: "Chambord", category: "Liqueurs" },
  { name: "Amaro Nonino", category: "Liqueurs" },
  { name: "Crème de Cacao", category: "Liqueurs" },
  { name: "Chartreuse", category: "Liqueurs" },
  { name: "Cynar", category: "Liqueurs" },
  { name: "Limoncello", category: "Liqueurs" },
  { name: "Dry vermouth", category: "Liqueurs" },
  { name: "Sweet vermouth", category: "Liqueurs" },

  { name: "Lemon juice", category: "Juices" },
  { name: "Lime juice", category: "Juices" },
  { name: "Orange juice", category: "Juices" },
  { name: "Grapefruit juice", category: "Juices" },
  { name: "Pineapple juice", category: "Juices" },
  { name: "Cranberry juice", category: "Juices" },
  { name: "Tomato juice", category: "Juices" },

  { name: "Simple syrup", category: "Sweeteners" },
  { name: "Agave nectar", category: "Sweeteners" },
  { name: "Honey", category: "Sweeteners" },
  { name: "Maple syrup", category: "Sweeteners" },
  { name: "Orgeat syrup", category: "Sweeteners" },
  { name: "Grenadine", category: "Sweeteners" },
  { name: "Sugar cube", category: "Sweeteners" },

  { name: "Angostura bitters", category: "Bitters" },
  { name: "Peychaud's bitters", category: "Bitters" },
  { name: "Orange bitters", category: "Bitters" },

  { name: "Club soda", category: "Mixers" },
  { name: "Cranberry soda", category: "Mixers" },
  { name: "Grapefruit soda", category: "Mixers" },
  { name: "Tonic water", category: "Mixers" },
  { name: "Cola", category: "Mixers" },
  { name: "Ginger beer", category: "Mixers" },
  { name: "Ginger ale", category: "Mixers" },
  { name: "Red Bull", category: "Mixers" },
  { name: "7-Up", category: "Mixers" },
  { name: "Sprite", category: "Mixers" },
  { name: "Sparkling wine", category: "Mixers" },
  { name: "Espresso", category: "Mixers" },
  { name: "Salt", category: "Mixers" },
  { name: "Mint leaves", category: "Mixers" },

  { name: "Lime", category: "Garnishes" },
  { name: "Lemon", category: "Garnishes" },
  { name: "Grapefruit", category: "Garnishes" },
  { name: "Orange", category: "Garnishes" },
  { name: "Cucumber", category: "Garnishes" },
  { name: "Pineapple", category: "Garnishes" },
  { name: "Cocktail cherry", category: "Garnishes" },
  { name: "Olive", category: "Garnishes" },
  { name: "Basil leaves", category: "Garnishes" },
  { name: "Jalapeno", category: "Garnishes" },
  { name: "Grated nutmeg", category: "Garnishes" },
  { name: "Cinnamon stick", category: "Garnishes" },
  { name: "Mint sprig", category: "Garnishes" },
]

const drinks = [
  {
    name: 'Daiquiri',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653416811/cocktails/daiquiri_tstpj5.webp',
    tutorialUrl: 'https://youtu.be/TbRmNrAeymo',
    instructions: 'Combine 2 oz white rum, 1 oz fresh lime juice, and 3/4 oz simple syrup in a cocktail shaker filled with ice, shake well, strain into a chilled coupe or martini glass, and garnish with a lime wheel or twist.',
    categories: [
      'Daiquiri',
      'Classic',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'White rum',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Simple syrup',
        amount: 0.75,
        unit: 'OZ'
      }
    ]
  },

  {
    name: 'Old Fashioned',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683641551/cocktails/brandy-old-fashioned-720x720-primary-4416daf388d440fb852f824febdc2557_shrpoq.jpg',
    instructions: 'In a rocks glass, muddle a sugar cube, 2 dashes of Angostura bitters, and a splash of water or club soda. Add a large ice cube and 2 oz of bourbon or rye whiskey. Stir well and garnish with an orange peel and a cocktail cherry.',
    categories: [
      'Old Fashioned',
      'Classic',
      'Stirred'
    ],
    ingredients: [
      {
        name: 'Bourbon',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Sugar cube',
        amount: 1,
        unit: 'PIECE'
      },
      {
        name: 'Angostura bitters',
        amount: 2,
        unit: 'DASH'
      },
      {
        name: 'Orange',
        amount: 1,
        unit: 'PEEL'
      },
      {
        name: 'Cocktail cherry',
        amount: 1,
        unit: 'PIECE'
      }
    ]
  },

  {
    name: 'Margarita',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673530916/cocktails/margarita_qpji0f.jpg',
    tutorialUrl: 'https://youtu.be/XhXgmkP1r3c',
    instructions: 'Rub the rim of a chilled rocks glass with a lime wedge, then dip the rim in salt. In a cocktail shaker, combine 2 oz tequila, 1 oz fresh lime juice, 3/4 oz orange liqueur, and ice. Shake well and strain over fresh ice into the prepared glass. Garnish with a lime wheel or wedge.',
    categories: [
      'Margarita',
      'Classic',
      'Sour',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'Tequila',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Cointreau',
        amount: 0.75,
        unit: 'OZ'
      },
    ]
  },
  {
    name: 'Moscow Mule',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673530201/cocktails/moscow_mule_jjnyhb.webp',
    tutorialUrl: 'https://youtu.be/J7X-AeGHPcE',
    instructions: 'Combine 2 oz vodka, 1 oz fresh lime juice, and 4 oz ginger beer in a Moscow Mule mug or highball glass filled with ice, stir well, and garnish with a lime wheel.',
    categories: [
      'Moscow Mule',
      'Classic',
      'Fizz'
    ],
    ingredients: [
      {
        name: 'Vodka',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Ginger beer',
        amount: 4,
        unit: 'OZ'
      },
      {
        name: 'Lime',
        amount: 1,
        unit: 'WHEEL'
      }
    ]
  },
  {
    name: 'Negroni',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653416810/cocktails/negroni_i6bhyk.jpg',
    tutorialUrl: 'https://youtu.be/lgy6vEX_hQg',
    instructions: 'Combine 1 oz gin, 1 oz sweet vermouth, and 1 oz Campari in a mixing glass filled with ice, stir well, strain into a rocks glass filled with ice, and garnish with an orange peel.',
    categories: [
      'Negroni',
      'Stirred',
      'Herbal'
    ],
    ingredients: [
      {
        name: 'Gin',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Sweet vermouth',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Campari',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Orange',
        amount: 1,
        unit: 'PEEL'
      }
    ]
  },

  {
    name: 'Martini',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683636960/cocktails/Vodka-Dirty-Martini-Square-1.jpg_qfuuza.webp',
    tutorialUrl: 'https://youtu.be/75k7dsINNQ0',
    instructions: 'Combine 2.5 oz gin or vodka and 0.5 oz dry vermouth in a mixing glass filled with ice, stir well, strain into a chilled martini glass, and garnish with a lemon twist or olive.',
    categories: [
      'Martini',
      'Classic',
      'Stirred'
    ],
    ingredients: [
      {
        name: 'Gin',
        amount: 2.5,
        unit: 'OZ'
      },
      {
        name: 'Dry vermouth',
        amount: 0.5,
        unit: 'OZ'
      }
    ]
  },
  {
    name: 'Mojito',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653506350/cocktails/mojito_gzur4i.webp',
    tutorialUrl: 'https://youtu.be/NANdz-YKMUw',
    instructions: 'Muddle 4 lime wedges and 10-12 mint leaves with 1 oz simple syrup in a highball glass, add ice, 2 oz white rum, and top with soda water, stir well and garnish with a sprig of mint and a lime wheel.',
    categories: [
      'Mojito',
      'Classic',
      'Fizz'
    ],
    ingredients: [
      {
        name: 'White rum',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime',
        amount: 4,
        unit: 'WHEEL'
      },
      {
        name: 'Mint leaves',
        amount: 10,
        unit: 'PIECE'
      },
      {
        name: 'Simple syrup',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Club soda',
        amount: 4,
        unit: 'OZ'
      }
    ]
  },

  {
    name: 'Manhattan',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653416976/cocktails/manhattan_fpylug.jpg',
    tutorialUrl: 'https://youtu.be/eWESf1b317Y',
    instructions: 'Stir 2.5 oz rye whiskey, 1 oz sweet vermouth, and 2 dashes Angostura bitters with ice, strain into a chilled glass, and garnish with a cherry.',
    categories: [
      'Classic',
      'Stirred',
      'Manhattan'
    ],
    ingredients: [
      {
        name: 'Rye whiskey',
        amount: 2.5,
        unit: 'OZ'
      },
      {
        name: 'Sweet vermouth',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Angostura bitters',
        amount: 2,
        unit: 'DASH'
      },
      {
        name: 'Cocktail cherry',
        amount: 1,
        unit: 'PIECE'
      }
    ]
  },

  {
    name: 'Tiki Punch',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683637080/cocktails/7f8d789b95969c4405586329f96bdbbf_hxquos.png',
    instructions: 'Combine 2 oz dark rum, 1 oz pineapple juice, 1 oz orange juice, 1/2 oz lime juice, and 1/2 oz simple syrup in a shaker with ice, shake well, pour into a glass filled with crushed ice, and garnish with a pineapple wedge.',
    categories: [
      'Tiki',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'Dark rum',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Pineapple juice',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Orange juice',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 0.5,
        unit: 'OZ'
      },
      {
        name: 'Simple syrup',
        amount: 0.5,
        unit: 'OZ'
      },
      {
        name: 'Pineapple',
        amount: 1,
        unit: 'WEDGE'
      }
    ]
  },

  {
    name: 'Mai Tai',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683637210/cocktails/Mai-Tai-Cocktail-Recipe-Featured-Image_kx0gj4.jpg',
    instructions: 'Combine 2 oz aged rum, 3/4 oz lime juice, 1/2 oz orange curacao, 1/4 oz orgeat syrup, 1/4 oz simple syrup, and 1/4 oz dark rum in a cocktail shaker filled with ice, shake well, strain into a rocks glass filled with crushed ice, and garnish with a mint sprig and lime wheel.',
    categories: [
      'Tiki',
      'Sour',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'Rum',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 0.75,
        unit: 'OZ'
      },
      {
        name: 'Orange Curaçao',
        amount: 0.5,
        unit: 'OZ'
      },
      {
        name: 'Orgeat syrup',
        amount: 0.25,
        unit: 'OZ'
      },
      {
        name: 'Simple syrup',
        amount: 0.25,
        unit: 'OZ'
      },
      {
        name: 'Dark rum',
        amount: 0.25,
        unit: 'OZ'
      }
    ]
  },

  {
    name: 'Espresso Martini',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683637361/cocktails/Tequila-Espresso-Martini-SQUARE_wixuaw.jpg',
    instructions: 'Add 2 oz vodka, 1 oz freshly brewed espresso, 1/2 oz coffee liqueur, and 1/2 oz simple syrup to a cocktail shaker filled with ice, shake vigorously for 10-15 seconds, strain into a chilled martini glass, and garnish with coffee beans.',
    categories: [
      'Martini',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'Vodka',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Espresso',
        amount: 1,
        unit: 'OZ'
      },
      {
        name: 'Coffee liqueur',
        amount: 0.5,
        unit: 'OZ'
      },
      {
        name: 'Simple syrup',
        amount: 0.5,
        unit: 'OZ'
      }
    ]
  },
  {
    name: 'East Side Fizz',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683638483/cocktails/eastside-cocktail-0006_t8nwoh.jpg',
    instructions: 'Muddle 8 mint leaves, 3/4 oz fresh lime juice, and 3/4 oz simple syrup in a shaker, add 2 oz gin, fill with ice, and shake well. Strain into a highball glass over fresh ice, top with 2 oz chilled club soda, and garnish with a mint sprig and cucumber slice.',
    categories: [
      'Fizz',
      'Herbal',
      'Classic',
      'Shaken'
    ],
    ingredients: [
      {
        name: 'Gin',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Lime juice',
        amount: 0.75,
        unit: 'OZ'
      },
      {
        name: 'Simple syrup',
        amount: 0.75,
        unit: 'OZ'
      },
      {
        name: 'Club soda',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Mint leaves',
        amount: 8,
        unit: 'PIECE'
      },
      {
        name: 'Cucumber',
        amount: 1,
        unit: 'SLICE'
      }
    ]
  },
  {
    name: 'Paloma',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683638731/cocktails/Paloma-Cocktail-Thumbnail_wijgiw.jpg',
    instructions: 'Rim a highball glass with salt, fill the glass with ice, pour in 2 oz tequila and 3 oz grapefruit juice, top with club soda, stir gently, and garnish with a grapefruit slice.',
    categories: [
      'Sour',
      'Fizz'
    ],
    ingredients: [
      {
        name: 'Tequila',
        amount: 2,
        unit: 'OZ'
      },
      {
        name: 'Grapefruit juice',
        amount: 3,
        unit: 'OZ'
      },
      {
        name: 'Club soda',
        amount: 3,
        unit: 'OZ'
      },
      {
        name: 'Salt',
        amount: 1,
        unit: 'PINCH'
      },
      {
        name: 'Grapefruit',
        amount: 1,
        unit: 'WHEEL'
      }
    ]
  },

  {
    name: 'Mint Julep',
    imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1683638970/cocktails/mint-julep-720x720-primary-5e2063b906384479b345687201992bd0_ymqfqp.jpg',
    instructions: 'In a julep cup or double old fashioned glass, muddle 10-12 fresh mint leaves with 1/2 oz simple syrup, add 2 1/2 oz bourbon, fill with crushed ice, stir well, and garnish with a fresh mint sprig.',
    categories: [
      'Herbal',
      'Classic'
    ],
    ingredients: [
      {
        name: 'Bourbon',
        amount: 2.5,
        unit: 'OZ'
      },
      {
        name: 'Mint leaves',
        amount: 10,
        unit: 'PIECE'
      },
      {
        name: 'Simple syrup',
        amount: 0.5,
        unit: 'OZ'
      },
      {
        name: 'Mint sprig',
        amount: 1,
        unit: 'PIECE'
      }
    ]
  }

]

async function main() {

  // upsert categories
  const upsertCategories = categoryNames.map((category) =>
    prisma.category.upsert({
      where: { name: category },
      create: { name: category },
      update: {},
    }),
  );
  await Promise.all(upsertCategories);

  // upsert ingredients
  const upsertIngredients = ingredients.map((ingredient) =>
    prisma.ingredient.upsert({
      where: { name: ingredient.name },
      create: ingredient,
      update: ingredient,
    }),
  );
  await Promise.all(upsertIngredients);

  // upsert drinks in series
  for (let index = 0; index < drinks.length; index++) {
    let drink = drinks[index];

    if (drink) {
      await prisma.drink.upsert({
        where: { name: drink.name },
        update: {},
        create: {
          name: drink.name,
          imageUrl: drink.imageUrl,
          tutorialUrl: drink.tutorialUrl,
          instructions: drink.instructions,
          categories: {
            connect: drink.categories.map(category => { return { name: category } })
          },
          ingredients: {
            create: drink.ingredients.map(ingredient => {
              return {
                ingredient: {
                  connect: {
                    name: ingredient.name
                  }
                },
                amount: ingredient.amount,
                unit: ingredient.unit
              }
            }),
          },
        },
      })
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export { }