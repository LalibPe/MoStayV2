/**
 * MoStay Boutique Hotel — Guest Directory Data
 * This file is the single source of truth for all guest booklet content.
 * To add, remove, or edit an entry, simply modify this array.
 */

const guestDirectory = [
  {
    category: "Arrival & Departure",
    categoryBs: "Dolazak i Odlazak",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 22V12h6v10M8 7h1m6 0h1M8 11h1m6 0h1"/></svg>',
    items: [
      {
        title: "Vrijeme prijave/odjave",
        titleEn: "Check-in / Check-out",
        content:
          "Prijava (Check-in) počinje od 14:00 sati. Odjava (Check-out) je najkasnije do 11:00 sati na dan odlaska.",
        contentEn:
          "Check-in starts from 14:00. Check-out is no later than 11:00 on the day of departure.",
      },
      {
        title: "Recepcija & Hitni slučajevi",
        titleEn: "Reception & Emergencies",
        content:
          "Recepcija radi 24 sata dnevno. Hitni brojevi — Policija: 122, Vatrogasci: 123, Hitna pomoć: 124.",
        contentEn:
          "Reception is open 24 hours a day. Emergency numbers — Police: 122, Fire: 123, Ambulance: 124.",
      },
    ],
  },
  {
    category: "In-Room Comfort",
    categoryBs: "Udobnost u Sobi",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>',
    items: [
      {
        title: "Adapter",
        titleEn: "Power Adapters",
        content:
          "Putne adaptere, analogne adaptere i produžne kablove možete dobiti na recepciji uz depozit od 15,00 €.",
        contentEn:
          "Travel adapters, analog adapters and extension cords are available at reception with a deposit of €15.00.",
      },
      {
        title: "Brzi internet",
        titleEn: "High-Speed Internet",
        content:
          "Besplatan visoki internet dostupan je u cijelom hotelu i u svim sobama.",
        contentEn:
          "Free high-speed internet is available throughout the hotel and in all rooms.",
      },
      {
        title: "Molimo ne uznemiravati",
        titleEn: "Do Not Disturb",
        content:
          "Objesite znak na vrata sobe ukoliko ne želite da budete uznemiravani ili da soba još ne bude očišćena.",
        contentEn:
          "Hang the sign on your door if you do not wish to be disturbed or for your room to be cleaned.",
      },
      {
        title: "Punjenje baterija",
        titleEn: "Battery Charging",
        content:
          "Punjenje baterija za e-bicikle u sobama NIJE dozvoljeno iz sigurnosnih razloga.",
        contentEn:
          "Charging e-bike batteries in rooms is NOT permitted for safety reasons.",
      },
    ],
  },
  {
    category: "Dining & Services",
    categoryBs: "Hrana i Usluge",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2m4-2v2"/></svg>',
    items: [
      {
        title: "Doručak",
        titleEn: "Breakfast",
        content:
          "Bogati buffet doručak se poslužuje u prizemlju u saradnji sa Mrvica Café & Pâtisserie. Pon-Pet: 07:00–10:30; Sub-Ned i praznici: 07:00–11:00.",
        contentEn:
          "A rich buffet breakfast is served on the ground floor in partnership with Mrvica Café & Pâtisserie. Mon–Fri: 07:00–10:30; Sat–Sun & holidays: 07:00–11:00.",
        gallery: [
          'media/BreakFast/MOSTAY - SLIKE (1).webp',
          'media/BreakFast/MOSTAY - SLIKE (2).webp',
          'media/BreakFast/MOSTAY - SLIKE (3).webp',
          'media/BreakFast/MOSTAY - SLIKE (4).webp',
          'media/BreakFast/MOSTAY - SLIKE (5).webp',
          'media/BreakFast/MOSTAY - SLIKE (6).webp',
          'media/BreakFast/MOSTAY - SLIKE (7).webp',
          'media/BreakFast/MOSTAY - SLIKE (8).webp',
          'media/BreakFast/MOSTAY - SLIKE (9).webp',
          'media/BreakFast/MOSTAY - SLIKE (10).webp',
          'media/BreakFast/MOSTAY - SLIKE (11).webp',
          'media/BreakFast/MOSTAY - SLIKE (12).webp',
          'media/BreakFast/MOSTAY - SLIKE (13).webp',
          'media/BreakFast/MOSTAY - SLIKE (14).webp',
          'media/BreakFast/MOSTAY - SLIKE (15).webp',
          'media/BreakFast/MOSTAY - SLIKE (16).webp',
          'media/BreakFast/MOSTAY - SLIKE (17).webp',
          'media/BreakFast/MOSTAY - SLIKE (18).webp',
          'media/BreakFast/MOSTAY - SLIKE (19).webp',
          'media/BreakFast/MOSTAY - SLIKE (20).webp',
          'media/BreakFast/MOSTAY - SLIKE (21).webp',
          'media/BreakFast/MOSTAY - SLIKE (22).webp',
          'media/BreakFast/MOSTAY - SLIKE (23).webp',
          'media/BreakFast/MOSTAY - SLIKE (24).webp',
          'media/BreakFast/MOSTAY - SLIKE (25).webp',
          'media/BreakFast/MOSTAY - SLIKE (26).webp',
          'media/BreakFast/MOSTAY - SLIKE (27).webp',
          'media/BreakFast/MOSTAY - SLIKE (28).webp',
          'media/BreakFast/MOSTAY - SLIKE (30).webp',
          'media/BreakFast/MOSTAY - SLIKE (38).webp',
        ],
      },
      {
        title: "Veš / Pranje",
        titleEn: "Laundry Service",
        content:
          "Veš predajte do 08:00 sati ako želite povrat isti dan. Koristite vrećicu za veš i formular iz ormara.",
        contentEn:
          "Submit laundry before 08:00 for same-day return. Use the laundry bag and form from the wardrobe.",
      },
      {
        title: "Suveniri",
        titleEn: "Souvenir Shop",
        content:
          "U lobbiju postoji Souvenir shop u radnom vremenu od 08:00–22:00 h.",
        contentEn:
          "A souvenir shop is located in the lobby, open daily from 08:00–22:00.",
      },
    ],
  },
  {
    category: "Facilities & Surroundings",
    categoryBs: "Sadržaji i Okolina",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    items: [
      {
        title: "Parking",
        titleEn: "Parking",
        content:
          "Privatni parking je dostupan uz doplatu od 5 € po danu (ili 15 € po danu za osigurani on-site pristup).",
        contentEn:
          "Private parking is available for an additional fee of €5 per day (or €15 per day for secured on-site access).",
      },
      {
        title: "Apoteka",
        titleEn: "Pharmacy",
        content:
          "Najbliža apoteka nalazi se 450 m od hotela (<a href=\"https://www.google.com/maps/search/?api=1&query=Apoteka+Zalik,+Zalik+15,+Mostar+88104\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"text-decoration: underline; font-weight: 500; color: inherit;\">Apoteka Zalik, Zalik 15, Mostar 88104</a>. Radno vrijeme: 08:00–20:00). U hitnim slučajevima kontaktirajte recepciju.",
        contentEn:
          "The nearest pharmacy is 450 m from the hotel (<a href=\"https://www.google.com/maps/search/?api=1&query=Apoteka+Zalik,+Zalik+15,+Mostar+88104\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"text-decoration: underline; font-weight: 500; color: inherit;\">Apoteka Zalik, Zalik 15, Mostar 88104</a>. Hours: 08:00–20:00). In emergencies, contact reception.",
      },
      {
        title: "Banka / Benzinska pumpa",
        titleEn: "ATM / Petrol Station",
        content:
          "Bankomat je dostupan 450 m od objekta. Najbliža benzinska pumpa nalazi se 600 m od hotela (Bingo Petrol).",
        contentEn:
          "ATM is available 450 m from the property. The nearest petrol station is 600 m from the hotel (Bingo Petrol).",
      },
    ],
  },
  {
    category: "Hotel Policies",
    categoryBs: "Pravila Hotela",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    items: [
      {
        title: "Pušenje",
        titleEn: "Smoking Policy",
        content:
          "Hotel je potpuno nepušački. Pušenje u sobama strogo zabranjeno (kazna za čišćenje iznosi 250,00 €).",
        contentEn:
          "The hotel is completely non-smoking. Smoking in rooms is strictly prohibited (cleaning penalty: €250.00).",
      },
    ],
  },
];
