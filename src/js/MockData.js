function generateVoteCount() {
    return Math.floor((Math.random() * 50) + 15);
}

const products = [
    {
        id: 1,
        title: 'Yellow Pail',
        description: 'On-demand sand castle construction expertise.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/daniel.jpg',
        productImageUrl: 'images/products/image-aqua.png',
    },
    {
        id: 2,
        title: 'Supermajority: The Fantasy Congress League',
        description: 'Earn points when your favorite politicians pass legislation.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/kristy.png',
        productImageUrl: 'images/products/image-rose.png',
    },
    {
        id: 3,
        title: 'Tinfoild: Tailored tinfoil hats',
        description: 'We already have your measurements and shipping address.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/veronika.jpg',
        productImageUrl: 'images/products/image-steel.png',
    },
    {
        id: 4,
        title: 'Haught or Naught',
        description: 'High-minded or absent-minded? You decide.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/molly.png',
        productImageUrl: 'images/products/image-yellow.png',
    },
    {
        id: 5,
        title: 'A New Beginning',
        description: 'On-demand sand castle construction expertise.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/elliot.jpg',
        productImageUrl: 'images/products/image-aqua.png',
    },
    {
        id: 6,
        title: 'All ways to dispatch',
        description: 'Earn points when your favorite politicians pass legislation.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/kristy.png',
        productImageUrl: 'images/products/image-rose.png',
    },
    {
        id: 7,
        title: 'A song of Ice and Fire',
        description: 'We already have your measurements and shipping address.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/elyse.png',
        productImageUrl: 'images/products/image-steel.png',
    },
    {
        id: 8,
        title: 'Star Wars - Last Chapter',
        description: 'High-minded or absent-minded? You decide.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/daniel.jpg',
        productImageUrl: 'images/products/image-yellow.png',
    },
]

export default products