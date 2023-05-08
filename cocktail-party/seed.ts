const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.drink.upsert({
    where: { name: 'Daiquiri' },
    update: {},
    create: {
      name: 'Daiquiri',
      imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653416811/cocktails/daiquiri_tstpj5.webp',
      tutorialUrl: 'https://youtu.be/TbRmNrAeymo',
      categories: {
        connectOrCreate: [
          {
            where: {
              name: 'Daiquiri',
            },
            create: {
              name: 'Daiquiri',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/daiquiri_j3bdnj.png'
            }
          },
          {
            where: {
              name: 'Classic'
            },
            create: {
              name: 'Classic',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/classic_zbmyy7.png'
            }
          },
          {
            where: {
              name: 'Shaken'
            },
            create: {
              name: 'Shaken',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/shaken_yy9kwc.png'
            }
          }
        ]
      },
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'White rum'
                },
                create: {
                  name: 'White rum',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621396/cocktails/ingredients/white_rum_a8jhto.png'
                }
              }
            },
            amount: 2,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Lime Juice'
                },
                create: {
                  name: 'Lime Juice',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673526378/cocktails/ingredients/lime_xa0fmx.png'
                }
              }
            },
            amount: 1,
            unit: 'OZ'
          },

          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Simple syrup'
                },
                create: {
                  name: 'Simple syrup',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621396/cocktails/ingredients/sugar_iqnpkr.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          }
        ]
      },
    },
  })

  await prisma.drink.upsert({
    where: { name: 'Negroni' },
    update: {},
    create: {
      name: 'Negroni',
      imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1653416810/cocktails/negroni_i6bhyk.jpg',
      tutorialUrl: 'https://youtu.be/lgy6vEX_hQg',
      categories: {
        connectOrCreate: [
          {
            where: {
              name: 'Classic'
            },
            create: {
              name: 'Classic',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/classic_zbmyy7.png'
            }
          },
          {
            where: {
              name: 'Stirred'
            },
            create: {
              name: 'Stirred',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673529267/cocktails/categories/stirred_vt2sib.jpg'
            }
          }
        ]
      },
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Gin'
                },
                create: {
                  name: 'Gin',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621397/cocktails/ingredients/gin_jvoteh.png'
                }
              }
            },
            amount: 1.5,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Campari'
                },
                create: {
                  name: 'Campari',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673529856/cocktails/ingredients/campariMJ2_jzs4lv.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Sweet Vermouth'
                },
                create: {
                  name: 'Sweet Vermouth',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621396/cocktails/ingredients/wineMJ_zmg984.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          }
        ]
      },
    },
  }),

  await prisma.drink.upsert({
    where: { name: 'Moscow mule' },
    update: {},
    create: {
      name: 'Moscow mule',
      imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673530201/cocktails/moscow_mule_jjnyhb.webp',
      tutorialUrl: 'https://youtu.be/J7X-AeGHPcE',
      categories: {
        connectOrCreate: [
          {
            where: {
              name: 'Classic'
            },
            create: {
              name: 'Classic',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/classic_zbmyy7.png'
            }
          }
        ]
      },
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Vodka'
                },
                create: {
                  name: 'Vodka',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621397/cocktails/ingredients/vodka_icon_hru8fl.png'
                }
              }
            },
            amount: 2,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Ginger beer'
                },
                create: {
                  name: 'Ginger beer',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621396/cocktails/ingredients/beerMJ_ougmci.png'
                }
              }
            },
            amount: 3,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Lime Juice'
                },
                create: {
                  name: 'Lime Juice',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673526378/cocktails/ingredients/lime_xa0fmx.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          },
        ]
      },
    },
  })

  await prisma.drink.upsert({
    where: { name: 'Margarita' },
    update: {},
    create: {
      name: 'Margarita',
      imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673530916/cocktails/margarita_qpji0f.jpg',
      tutorialUrl: 'https://youtu.be/XhXgmkP1r3c',
      categories: {
        connectOrCreate: [
          {
            where: {
              name: 'Classic'
            },
            create: {
              name: 'Classic',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/classic_zbmyy7.png'
            }
          },
          {
            where: {
              name: 'Shaken'
            },
            create: {
              name: 'Shaken',
              imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673418710/cocktails/shaken_yy9kwc.png'
            }
          }
        ]
      },
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Tequila'
                },
                create: {
                  name: 'Tequila',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621397/cocktails/ingredients/tequilla_icon_curghs.png'
                }
              }
            },
            amount: 1.75,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Orange liquor'
                },
                create: {
                  name: 'Orange liquor',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673621397/cocktails/ingredients/orange_liquor_kourwn.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          },
          {
            ingredient: {
              connectOrCreate: {
                where: {
                  name: 'Lime Juice'
                },
                create: {
                  name: 'Lime Juice',
                  imageUrl: 'https://res.cloudinary.com/dljchk64j/image/upload/v1673526378/cocktails/ingredients/lime_xa0fmx.png'
                }
              }
            },
            amount: 0.75,
            unit: 'OZ'
          },
        ]
      },
    },
  })
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

  export {}