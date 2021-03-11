import { PanelType, AssetType } from '../constants';

const LoremHtml = `<div style="text-indent: 2em;"><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id quam eget odio venenatis mattis. Donec ut ante sem. Donec ipsum nibh, fringilla id felis id, scelerisque egestas dolor. Sed gravida lorem non varius condimentum. Nullam fermentum magna et pellentesque lobortis. Morbi hendrerit sodales tincidunt. Cras condimentum sem vitae dictum eleifend. Fusce eu tortor orci. Suspendisse tristique cursus arcu vitae rhoncus.</p></div>
<div><p>Sed at turpis sapien. Vestibulum elementum magna diam, vel dignissim quam efficitur sit amet. Vestibulum non dui dignissim, commodo lacus non, luctus lacus. Sed vulputate neque quis augue gravida, in semper dui interdum. Fusce ultricies lacinia sem, vitae rhoncus est posuere et. Donec at scelerisque odio. Nam pharetra id justo nec hendrerit. Donec sit amet lorem magna. Donec congue porttitor vestibulum. Nullam porta tellus et dignissim commodo. Vestibulum vitae pellentesque eros, ut molestie dolor.</p></div>
<div><p>Proin interdum ultricies ex vitae vulputate. Donec ornare viverra odio, ultrices cursus mi vestibulum convallis. Praesent ligula sem, consectetur eu elit sit amet, eleifend convallis lacus. Cras placerat justo ac ligula venenatis, at rutrum metus placerat. Sed cursus ante nisl, non condimentum dolor interdum id. Nullam accumsan eu justo non sodales. Nulla semper eu magna sed blandit. In id nulla libero. Mauris tincidunt non risus sed placerat. Donec nec augue nibh. Etiam diam tellus, ultricies sit amet tristique et, venenatis molestie augue. Phasellus ultrices pellentesque mattis. Nulla tincidunt metus ac tortor imperdiet fringilla. Vestibulum faucibus, nisi nec aliquet lacinia, augue turpis tempus neque, viverra luctus lectus lacus ut justo. Duis erat mauris, malesuada ac mi non, ullamcorper aliquam neque.</p></div>
<div><p>Donec volutpat, eros at dapibus tempus, lectus eros consectetur sem, vel porta sem nulla id sem. Donec sit amet nisl in velit porttitor auctor. In dignissim tristique feugiat. Curabitur rutrum vestibulum ex nec egestas. Nam rhoncus dictum vestibulum. In at massa hendrerit, vulputate ex vel, maximus quam. Sed maximus risus quis ante scelerisque, et pellentesque nibh rhoncus.</p></div>
<div><p>Nulla vitae ipsum ligula. Suspendisse vulputate aliquet ornare. Donec vitae malesuada sem. Aenean varius massa sit amet ante interdum, sit amet mattis elit interdum. In id ipsum arcu. Donec in mauris et dolor tempus convallis vitae quis nisl. Aenean bibendum nunc ac enim ultricies vehicula. Vivamus volutpat ante eu odio ornare vehicula. Praesent maximus mauris a sapien placerat, et aliquet neque fermentum. Quisque auctor pharetra nisl eget vulputate. Aliquam fringilla ornare purus quis ultricies. Aenean ut efficitur nulla. Proin porta nibh ut venenatis fermentum. Nunc ut convallis ligula, vel varius arcu.</p></div></div>`;

const Activities = ['1', '2', '3'].map((a) => ({
  _id: a,
  panels: [
    { _id: '0', type: PanelType.Timeless, width: 0.32 },
    { _id: '1', type: PanelType.Timeless, width: 0.4 },
    { _id: '2', type: PanelType.Choices, width: 0.28 },
  ],
  tries: 2,
  isSingle: true,
  instructions: 'Choose the best answer.',
  assets: [
    {
      _id: '0',
      panelId: '0',
      type: AssetType.Stateful,
      includeInitial: true,
      initialGreeting: `This is Activity ${a}. What is the best choice here?`,
      images: [
        {
          stateType: 'correct',
          url: 'https://content.praktio.com/asset/Characters_C1_Gleeful-1570679956956.png',
        },
        {
          stateType: 'default',
          url:
            'https://content.praktio.com/asset/Characters_C1_Initial%20Greeting-1570679956956.png',
        },
        {
          stateType: 'allWrong',
          url: 'https://content.praktio.com/asset/Characters_C1_Frown-1570678946562.png',
        },
        {
          stateType: 'someWrong',
          url: 'https://content.praktio.com/asset/Characters_C1_Slight%20Frown-1570679812368.png',
        },
      ],
      referenceContent: {
        content: LoremHtml,
      },
    },
    {
      _id: '1',
      panelId: '1',
      type: AssetType.Document,
      content: LoremHtml,
    },
    {
      _id: '2',
      panelId: '2',
      type: AssetType.Choice,
      content: 'Choice 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      explanation: 'This is not the correct answer',
    },
    {
      _id: '3',
      panelId: '2',
      type: AssetType.Choice,
      content: 'Choice 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      explanation: 'This is the correct answer',
      correct: true,
    },
    {
      _id: '4',
      panelId: '2',
      type: AssetType.Choice,
      content: 'Choice 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      explanation: 'This is not the correct answer',
    },
    {
      _id: '5',
      panelId: '2',
      type: AssetType.Choice,
      content: 'Choice 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      explanation: 'This is not the correct answer',
    },
  ],
}));

export default Activities;
