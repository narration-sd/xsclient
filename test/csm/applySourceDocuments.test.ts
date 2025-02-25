import {applySourceDocuments, type ContentSourceMap} from '@sanity/client/csm'
import {describe, expect, test} from 'vitest'

describe('complex queries', () => {
  test('Can apply an array keyed field update', () => {
    const result = {
      page: {
        _type: 'page',
        _id: 'drafts.home',
        title: 'Home',
        sections: [
          {
            symbol: null,
            products: null,
            _type: 'hero',
            tagline: 'ACME’s elegant construction is both minimal and inviting.',
            headline: 'Touch of Texture ',
            subline: 'You can follow us on Twitter, Twitch, LinkedIn, and GitHub.',
            style: {
              _type: 'sectionStyle',
              variant: 'default',
            },
            _key: '44540ccd70c3',
            product: null,
          },
        ],
      },
    }
    const resultSourceMap = {
      documents: [
        {
          _id: 'drafts.home',
          _type: 'page',
        },
        {
          _id: 'drafts.462efcc6-3c8b-47c6-8474-5544e1a4acde',
          _type: 'product',
        },
        {
          _id: 'drafts.e1bf9f1f-efdb-4105-8c26-6b64f897e9c1',
          _type: 'product',
        },
        {
          _id: 'drafts.807cc05c-8c4c-443a-a9c1-198fd3fd7b16',
          _type: 'product',
        },
        {
          _id: 'drafts.siteSettings',
          _type: 'siteSettings',
        },
      ],
      paths: [
        "$['_type']",
        "$['_id']",
        "$['title']",
        "$['sections'][?(@._key=='44540ccd70c3')]['style']",
        "$['sections'][?(@._key=='44540ccd70c3')]['_key']",
        "$['sections'][?(@._key=='44540ccd70c3')]['_type']",
        "$['sections'][?(@._key=='44540ccd70c3')]['tagline']",
        "$['sections'][?(@._key=='44540ccd70c3')]['headline']",
        "$['sections'][?(@._key=='44540ccd70c3')]['subline']",
      ],
      mappings: {
        "$['page']['_id']": {
          source: {
            document: 0,
            path: 1,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['_type']": {
          source: {
            document: 0,
            path: 0,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['_key']": {
          source: {
            document: 0,
            path: 4,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['_type']": {
          source: {
            document: 0,
            path: 5,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['headline']": {
          source: {
            document: 0,
            path: 7,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['style']": {
          source: {
            document: 0,
            path: 3,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['subline']": {
          source: {
            document: 0,
            path: 8,
            type: 'documentValue',
          },
          type: 'value',
        },
        "$['page']['sections'][0]['tagline']": {
          source: {
            document: 0,
            path: 6,
            type: 'documentValue',
          },
          type: 'value',
        },
      },
    } satisfies ContentSourceMap
    // In this draft the headline "Touch of Texture 1" is changed
    const draft = {
      _createdAt: '2023-06-27T14:35:36Z',
      _id: 'drafts.home',
      _rev: '3b8d3273-43ec-471c-9629-1ab5e0e894fa',
      _type: 'page',
      _updatedAt: '2023-10-26T13:22:12.692Z',
      sections: [
        {
          _key: '44540ccd70c3',
          _type: 'hero',
          headline: 'Touch of Texture 1',
          style: {
            _type: 'sectionStyle',
            variant: 'default',
          },
          subline: 'You can follow us on Twitter, Twitch, LinkedIn, and GitHub.',
          tagline: 'ACME’s elegant construction is both minimal and inviting.',
        },
      ],
      title: 'Home',
    }

    const optimisticResult = applySourceDocuments(result, resultSourceMap, (sourceDocument) =>
      sourceDocument._id === draft._id ? draft : undefined,
    )
    expect(result.page.sections[0].headline).not.toBe(draft.sections[0].headline)
    expect(optimisticResult.page.sections[0].headline).toBe(draft.sections[0].headline)
  })
})

describe('simple queries', () => {
  const result = [
    {
      title: ' Lunar Glide: Moon 🌙 Walking Sneaker 👟',
      slug: {
        current: 'lunar-glide-moon-walking-sneakers',
        _type: 'slug',
      },
      price: '600',
      media: {
        alt: '',
        asset: {
          _type: 'reference',
          _ref: 'image-6b34db59881e9566f3dd0be25e3059c15f145ea1-5000x4000-jpg',
        },
        crop: null,
        hotspot: null,
      },
      brand: null,
    },
  ]
  const resultSourceMap = {
    documents: [
      {
        _id: 'drafts.04eee032-4e79-4691-ba8d-23d403404462',
        _type: 'shoe',
      },
    ],
    paths: [
      "$['slug']",
      "$['price']",
      "$['media'][?(@._key=='a5ecdafbbf23')]['alt']",
      "$['media'][?(@._key=='a5ecdafbbf23')]['asset']",
      "$['title']",
    ],
    mappings: {
      "$[0]['media']['alt']": {
        source: {
          document: 0,
          path: 2,
          type: 'documentValue',
        },
        type: 'value',
      },
      "$[0]['media']['asset']": {
        source: {
          document: 0,
          path: 3,
          type: 'documentValue',
        },
        type: 'value',
      },
      "$[0]['price']": {
        source: {
          document: 0,
          path: 1,
          type: 'documentValue',
        },
        type: 'value',
      },
      "$[0]['slug']": {
        source: {
          document: 0,
          path: 0,
          type: 'documentValue',
        },
        type: 'value',
      },
      "$[0]['title']": {
        source: {
          document: 0,
          path: 4,
          type: 'documentValue',
        },
        type: 'value',
      },
    },
  } satisfies ContentSourceMap
  // In this draft the headline "Touch of Texture 1" is changed
  const draft = {
    _createdAt: '2023-10-24T22:32:10Z',
    _id: 'drafts.04eee032-4e79-4691-ba8d-23d403404462',
    _rev: '353f9340-5242-472a-ace2-9ed3b35b697d',
    _type: 'shoe',
    _updatedAt: '2023-11-06T15:21:18Z',
    description: [
      {
        _key: '9e13c355c001',
        _type: 'block',
        children: [
          {
            _key: '45922d4ac846',
            _type: 'span',
            marks: [],
            text: 'Step into the future with our Lunar Glide sneakers. Inspired by the concept of moon walking, these boots are designed to give you an out-of-this-world experience.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: '8edf13f0aa44',
        _type: 'block',
        children: [
          {
            _key: 'e4f37de2e480',
            _type: 'span',
            marks: [],
            text: "With a unique design that mimics the moon's surface, you'll feel like you're walking on air. Perfect for those who dare to dream and reach for the stars.",
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: '83b0a0effe85',
        _type: 'block',
        children: [
          {
            _key: '1cca2a19e6d4',
            _type: 'span',
            marks: [],
            text: 'lorem ipsum dolor ',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    media: [
      {
        _key: 'a5ecdafbbf23',
        _type: 'image',
        alt: 'a pair of white fila shoes on a white surface',
        asset: {
          _ref: 'image-6b34db59881e9566f3dd0be25e3059c15f145ea1-5000x4000-jpg',
          _type: 'reference',
        },
      },
      {
        _key: 'de42470a6d7e',
        _type: 'image',
        alt: 'a pair of red and white puma shoes on a white background',
        asset: {
          _ref: 'image-30b82c6709c0f21268b679126abea51953ee95e0-2000x2000-png',
          _type: 'reference',
        },
      },
      {
        _key: '03062ec8c1df',
        _type: 'image',
        alt: 'red ish?',
        asset: {
          _ref: 'image-50ec4c0aa413c05ee616897bb4d7e53da9300851-6240x4160-jpg',
          _type: 'reference',
        },
      },
      {
        _key: 'aa9ce9dbb69e',
        _type: 'image',
        alt: 'a pair of blue and white puma sneakers on a white background',
        asset: {
          _ref: 'image-3cbcebadb37df62978382532f4962bd4b383dc42-2000x2000-png',
          _type: 'reference',
        },
      },
      {
        _key: 'fdda03417578',
        _type: 'image',
        alt: 'a pair of blue and white puma shoes on a white background',
        asset: {
          _ref: 'image-bf41fd175948f64963bdb36e24919d06cf252c5a-2000x2000-png',
          _type: 'reference',
        },
      },
      {
        _key: '5eaeda579ff0',
        _type: 'image',
        alt: 'a pair of white and yellow nike running shoes',
        asset: {
          _ref: 'image-d4ec5719e0ff4b353622fcd19bc9cec26cb981a2-1728x2160-png',
          _type: 'reference',
        },
      },
      {
        _key: 'f818bf37e73c',
        _type: 'image',
        alt: 'a pair of black nike running shoes on a white background',
        asset: {
          _ref: 'image-c8c55ac00c66668813e42c3a65453c0b18651314-1728x2160-png',
          _type: 'reference',
        },
      },
      {
        _key: '84b5a348eee4',
        _type: 'image',
        alt: 'a red nike shoe is on a red background',
        asset: {
          _ref: 'image-99b15b86bf42103d24e7f43daf824bc64f399529-5472x3648-jpg',
          _type: 'reference',
        },
      },
      {
        _key: 'ecad6c0bb52e',
        _type: 'image',
        alt: 'a pair of blue and white nike air jordans with orange laces',
        asset: {
          _ref: 'image-4ee918f4acbd9abfa147bae7c3121a01ffae6b02-3127x4690-jpg',
          _type: 'reference',
        },
      },
      {
        _key: 'f3717ed670bf',
        _type: 'image',
        alt: 'ok',
        asset: {
          _ref: 'image-d9c1d238064120a8c439e922f1e4778cf31b27c1-7016x4960-jpg',
          _type: 'reference',
        },
      },
      {
        _key: '4b2070d8b664',
        _type: 'image',
        alt: 'a pair of neon yellow nike shoes on a green background',
        asset: {
          _ref: 'image-fdcd7baa37dbf04de62626b2549a0b60964f67a0-2400x3000-jpg',
          _type: 'reference',
        },
      },
    ],
    price: 600,
    slug: {
      _type: 'slug',
      current: 'lunar-glide-moon-walking-sneakers',
    },
    title: 'Moon shoes!',
  }

  test('Can apply an array keyed field update', () => {
    const optimisticResult = applySourceDocuments(result, resultSourceMap, (sourceDocument) =>
      sourceDocument._id === draft._id ? draft : undefined,
    )
    expect(result[0].title).not.toBe(draft.title)
    expect(optimisticResult[0].title).toBe(draft.title)
    expect(result[0].media.alt).not.toBe(draft.media[0].alt)
    expect(optimisticResult[0].media.alt).toBe(draft.media[0].alt)
  })
})
