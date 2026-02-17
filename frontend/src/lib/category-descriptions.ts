/**
 * Labels au singulier et textes de présentation pour les catégories de médiations
 * (Court-métrage, Lip Dub, Médiation).
 */

function normalizeKey(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/^les\s+/, '');
}

/** Compare les clés sans tenir compte des accents (ex. "mediations" ≈ "médiations"). */
function keyWithoutAccents(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

const LIP_DUB = {
  label: 'Lip Dub',
  description:
    "Le terme « lip dub » de l'anglais lip, lèvre et dubbing, doublage consiste à mettre en scène un clip en un plan séquence en chantant en play back sur une chanson.\n\nLe lip dub se tourne en une journée avec une cinquantaine de participants, un groupe de vidéastes et une équipe de bénévoles."
};

const MEDIATION = {
  label: 'Médiation',
  description:
    "Ces projets d'atelier s'inventent et se construisent sur mesure avec les vidéastes et les institutions avec lesquels iels travaillent sur un temps adapté au projet pouvant aller d'une journée à plusieurs mois d'intervention en milieu scolaire ou milieu associatif.\n\nTous les genres cinématographiques peuvent être explorés : documentaires, clips, animations ou fiction."
};

const CONTENT: Record<string, { label: string; description: string }> = {
  'court-métrage': {
    label: 'Court-métrage',
    description:
      "L'atelier court-métrage se déroule en une journée avec une dizaine de participant(e)s, deux vidéastes et deux bénévoles de l'association.\n\nÉcriture collective de l'histoire, distribution des rôles et répétitions le matin, puis le tournage l'après-midi après un repas partagé."
  },
  'courts-métrages': {
    label: 'Court-métrage',
    description:
      "L'atelier court-métrage se déroule en une journée avec une dizaine de participant(e)s, deux vidéastes et deux bénévoles de l'association.\n\nÉcriture collective de l'histoire, distribution des rôles et répétitions le matin, puis le tournage l'après-midi après un repas partagé."
  },
  'lip dub': LIP_DUB,
  lipdub: LIP_DUB,
  lipdubs: LIP_DUB,
  médiation: MEDIATION,
  médiations: MEDIATION
};

function findContentKey(normalizedKey: string): string | undefined {
  if (CONTENT[normalizedKey]) return normalizedKey;
  const keyNorm = keyWithoutAccents(normalizedKey);
  for (const k of Object.keys(CONTENT)) {
    if (keyWithoutAccents(k) === keyNorm) return k;
  }
  const singular = normalizedKey.replace(/s$/, '');
  if (CONTENT[singular]) return singular;
  const singularNorm = keyWithoutAccents(singular);
  for (const k of Object.keys(CONTENT)) {
    if (keyWithoutAccents(k) === singularNorm) return k;
  }
  return undefined;
}

/** Retourne la clé normalisée pour une catégorie (ex. "Les médiations" → "médiations"). */
export function normalizeCategoryKey(category: string): string {
  return normalizeKey(category);
}

/** Label au singulier pour l’affichage (ex. "Médiations" → "Médiation"). */
export function getCategoryLabel(category: string): string | undefined {
  const key = findContentKey(normalizeCategoryKey(category));
  return key ? CONTENT[key].label : undefined;
}

/** Texte de présentation de la catégorie (paragraphes séparés par \n\n). */
export function getCategoryDescription(category: string): string | undefined {
  const key = findContentKey(normalizeCategoryKey(category));
  return key ? CONTENT[key].description : undefined;
}
