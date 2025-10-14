# 🎨 Système de Couleurs du Site

## Variables CSS Personnalisées

Le site utilise un système de couleurs centralisé défini dans `src/app/globals.css` :

### Couleurs Principales
- **Primary** : `#f59e0b` (amber-500) - Couleur principale pour les boutons et accents
- **Primary Hover** : `#d97706` (amber-600) - Version plus foncée au survol
- **Primary Light** : `#fbbf24` (amber-400) - Version plus claire

### Couleurs Secondaires
- **Secondary** : `#3b82f6` (blue-500) - Couleur secondaire pour les liens
- **Secondary Hover** : `#2563eb` (blue-600) - Version plus foncée au survol
- **Secondary Light** : `#60a5fa` (blue-400) - Version plus claire

## Comment Changer les Couleurs

### 1. Modifier les Variables CSS
Éditez le fichier `src/app/globals.css` et changez les valeurs dans `:root` :

```css
:root {
  --primary: #votre-couleur-primaire;
  --primary-hover: #votre-couleur-primaire-hover;
  --primary-light: #votre-couleur-primaire-claire;
  --secondary: #votre-couleur-secondaire;
  --secondary-hover: #votre-couleur-secondaire-hover;
  --secondary-light: #votre-couleur-secondaire-claire;
}
```

### 2. Classes Tailwind Utilisées
- `bg-primary` - Fond couleur primaire
- `bg-primary-hover` - Fond couleur primaire au survol
- `text-primary` - Texte couleur primaire
- `border-primary` - Bordure couleur primaire
- `hover:text-secondary` - Texte couleur secondaire au survol

### 3. Exemples de Changement de Thème

#### Thème Vert
```css
:root {
  --primary: #10b981; /* emerald-500 */
  --primary-hover: #059669; /* emerald-600 */
  --primary-light: #34d399; /* emerald-400 */
  --secondary: #8b5cf6; /* violet-500 */
  --secondary-hover: #7c3aed; /* violet-600 */
  --secondary-light: #a78bfa; /* violet-400 */
}
```

#### Thème Rouge
```css
:root {
  --primary: #ef4444; /* red-500 */
  --primary-hover: #dc2626; /* red-600 */
  --primary-light: #f87171; /* red-400 */
  --secondary: #3b82f6; /* blue-500 */
  --secondary-hover: #2563eb; /* blue-600 */
  --secondary-light: #60a5fa; /* blue-400 */
}
```

## Avantages du Système

✅ **Centralisé** : Toutes les couleurs sont définies en un seul endroit
✅ **Cohérent** : Utilisation systématique des variables
✅ **Flexible** : Changement de thème en quelques lignes
✅ **Maintenable** : Pas de couleurs codées en dur dans les composants
