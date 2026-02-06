# Vidéos des projets

Placez ici les fichiers vidéo de vos projets.

## Structure recommandée

- Nommez vos fichiers vidéo avec le même slug que le projet (par exemple: `le-reve-d-avignon.mp4`)
- Formats supportés: MP4, WebM
- Pour de meilleures performances, encodez vos vidéos en MP4 (H.264) et WebM (VP9)

## Exemple

```
public/videos/projets/
  ├── le-reve-d-avignon.mp4
  ├── le-reve-d-avignon.webm
  ├── autre-projet.mp4
  └── autre-projet.webm
```

## Optimisation

Pour optimiser vos vidéos pour le web, vous pouvez utiliser ffmpeg:

```bash
# Convertir en MP4 optimisé
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k output.mp4

# Convertir en WebM optimisé
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

