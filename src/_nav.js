export default {
  items: [
    {
      name: 'Cursos',
      url: '/dashboard',
      icon: 'icon-list',
    },
    
    {
      name: 'Mi Aprendizaje',
      url: '/deals',
      icon: 'icon-layers',

    },
    {
      name: 'Reportes',
      url: '/charts',
      icon: 'icon-graph',
      attributes: { disabled: true },
      badge: {
        variant: 'info',
        text: 'SOON',
      },
    },
    
    
  ],
};
