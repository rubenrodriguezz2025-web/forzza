# CLAUDE.md — Contexto del proyecto FORZZA

Lee este archivo COMPLETO antes de escribir cualquier código. Es tu memoria entre sesiones.

---

## ¿Qué es FORZZA?

**FORZZA** es una plataforma de fitness online cofundada por Rubén (tecnología/producto/operaciones) y Gabriel Herrera (@forzzacademy / @gabrielherreram_), influencer fitness con metodología propia "cuerpo de Hollywood".

El cliente accede a la plataforma → la IA genera rutinas y pautas de alimentación basadas en el Método FORZZA → el cliente sigue su programa con tracking de progreso → los tiers superiores incluyen seguimiento directo de Gabriel.

**Propuesta de valor**: "Tu método. Una plataforma. Ingresos que escalan." — Pasar del coaching 1:1 no escalable a una suite de productos digitales.

> ⚠️ **FORZZA vende "acceso al Método FORZZA" (contenido educativo).** Nunca decir que somos "entrenadores personales" ni "nutricionistas". Gabriel es "creador del Método FORZZA". Es un requisito legal y de posicionamiento.

---

## El Método FORZZA — Lo que la IA debe saber

### Filosofía central
- **"Menos es más"**: entrenar menos, entrenar mejor. Comer con libertad, no con cadenas.
- **Inspirado en**: Kinobody y Mike Mentzer
- **Objetivo**: físico definido, proporcional, con presencia — un "Hollywood Body" / "cuerpo de modelo" / "estatua griega"
- **Anti-industria**: sin dietas imposibles, sin 6 comidas al día, sin vivir encerrado en el gimnasio
- **Es un estilo de vida**, no una dieta estricta ni un plan rígido

### Entrenamiento FORZZA
- **2-3 sesiones/semana**, 45-60 min por sesión
- **Pirámide reversa**: calientas, empiezas con el peso más pesado (estás más fresco), luego bajas
- **1 serie efectiva al FALLO técnico + parciales inmediatas** (sin descanso, 4-8 reps cortas en rango medio)
- **Calentamiento mínimo**: 1 serie a 40-60% del peso objetivo, 8-12 reps
- **Compuestos**: 6-8 reps; accesorios: 8-12 reps
- **Descansos**: 2-4 min entre ejercicios
- **Progresión doble**: cuando alcanzas rango alto con buena forma, sube 2-5% de peso
- **NEAT alto**: 8.000-12.000 pasos/día; HIIT solo si estancas
- **Recuperación sagrada**: dormir 7-9h, 48-72h entre estímulos del mismo grupo
- **Deload**: cada 6-8 semanas o si caída de rendimiento

### Ejercicios principales (dan la silueta en V)
**Upper Body:**
- Pec Dec, Press inclinado mancuernas, Dominadas neutras (lastre opcional)
- Remo máquina Low Row, Remo deltoide posterior
- Press militar máquina, Elevaciones laterales máquina
- Bíceps (sentado mancuernas / barra / banco inclinado — elegir 1 por sesión)
- Press francés, Tríceps polea barra V, Fondos paralelas
- Encogimientos (Shrugs)

**Lower Body:**
- Peso muerto rumano (RDL), Hip Thrust (barra/máquina)
- Leg Extension, Leg Press, Leg Curl
- Calf Raises, Abdominales en máquina

**Estructuras de programa:**
- Opción A (2 días/sem): Upper / Lower
- Opción B (3 días/sem): Push / Pull / Legs o Full Body alterno

### Alimentación FORZZA
- **Ayuno intermitente**: 4-5h (hasta 6h avanzados) desde que te levantas. No contar desde la noche anterior.
- **Una comida grande al día** (almuerzo por defecto, pero adaptable a cena si el cliente prefiere)
- **Cena ligera**: proteína + verduras, carbo opcional pequeño
- **Frutas bajas en calorías** entre comidas si hace falta
- **No es dieta estricta**: son sugerencias de platos basadas en la experiencia de Gabriel
- **Plato FORZZA**: proteína (mayor parte) + carbo complejo + verduras + grasa saludable (menor porción)

**Macros:**
- Proteína: 1,6-2,2 g/kg peso corporal
- Grasas: 0,6-0,8 g/kg (mínimo para hormonas)
- Carbos: el resto de calorías, priorizar complejos en almuerzo
- Déficit suave: 10-20% menos del gasto diario

**Personalización actual (1:1):**
- Gabriel calcula calorías y macros en la primera llamada según peso/objetivo
- Adapta horario de ayuno según preferencia
- Arma platos concretos con las opciones del método
- Tras 2-3 semanas, el cliente deja de contar y come "al ojo" con los platos que ya conoce

### Hábitos y mentalidad
- Disciplina silenciosa: resultados visibles sin ruido
- Constancia > perfección
- Si fallas un día, vuelves sin culpa en la siguiente comida
- Check-ins semanales: peso, cintura, pecho, cadera, pasos, sueño, energía, adherencia

---

## Público objetivo

- **Hombres 25-40 años**, España + LATAM
- Quieren el "cuerpo de Hollywood" de Gabriel — estética, no fisicoculturismo
- Están cansados de planes que exigen vivir en el gimnasio
- Dispuestos a pagar por una metodología probada
- **También hay público mayor (40-60)** — la PWA debe ser ultra sencilla
- **LATAM es mercado activo desde el día 1** — precios en USD

---

## Stack técnico

```
Frontend:    Next.js 15 (App Router)
Auth + DB:   Supabase (PostgreSQL + Row Level Security) — región París
Pagos:       Stripe en USD (tarjeta + Apple Pay + Google Pay + OXXO México)
IA:          Anthropic Claude API (Coach IA FORZZA)
Email:       Resend + React Email
UI:          shadcn/ui + Tailwind CSS
Deploy:      Vercel
```

**Boilerplate base**: fork de `github.com/KolbySisk/next-supabase-stripe-starter`

---

## Estructura del proyecto

```
forzza/
├── CLAUDE.md                    # Este archivo — LEER PRIMERO
├── src/
│   ├── app/
│   │   ├── (marketing)/         # Web pública — landing, precios, about, legal
│   │   │   ├── page.tsx         # Home / landing
│   │   │   ├── pricing/
│   │   │   ├── about/
│   │   │   └── legal/           # T&Cs, privacidad, disclaimers
│   │   ├── (auth)/              # Login, registro, forgot-password
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── app/                 # PWA privada — requiere auth
│   │   │   ├── layout.tsx       # Layout tipo app (nav bottom, sin header web)
│   │   │   ├── dashboard/       # Home del cliente (progreso, rutina del día)
│   │   │   ├── training/        # Rutina actual, ejercicios, tracking
│   │   │   ├── nutrition/       # Plan alimentación, plato FORZZA
│   │   │   ├── coach/           # Chat con Coach IA FORZZA
│   │   │   ├── progress/        # Check-ins semanales, gráficas, fotos
│   │   │   ├── community/       # Link a Discord (MVP) o comunidad integrada (futuro)
│   │   │   └── settings/        # Perfil, suscripción, datos personales
│   │   ├── api/
│   │   │   ├── webhooks/        # Stripe webhooks
│   │   │   ├── coach/           # POST: chat con Coach IA (SSE streaming)
│   │   │   ├── training/        # POST: generar/adaptar rutina
│   │   │   └── onboarding/      # POST: calcular macros, generar programa inicial
│   │   └── layout.tsx
│   ├── features/
│   │   ├── auth/
│   │   ├── onboarding/          # PAR-Q + datos del cliente + cálculo macros
│   │   ├── training/            # Rutinas, ejercicios, tracking series
│   │   ├── nutrition/           # Plato FORZZA, opciones comidas, macros
│   │   ├── coach/               # Chat IA, system prompt, guardrails
│   │   ├── progress/            # Check-ins, métricas, gráficas
│   │   ├── billing/             # Stripe suscripciones, tiers
│   │   └── profile/
│   ├── libs/
│   │   ├── supabase/
│   │   ├── anthropic/
│   │   ├── stripe/
│   │   └── resend/
│   └── components/              # shadcn/ui + componentes compartidos
├── supabase/
│   └── migrations/
└── public/
    ├── manifest.json            # PWA manifest
    └── sw.js                    # Service worker básico
```

**Dos experiencias, un dominio:**
- `forzza.app` (o dominio elegido) → web pública (marketing/ventas)
- `forzza.app/app` → PWA privada (producto del cliente)

---

## Planes de precio

| Plan | Precio | Qué incluye | Trabajo de Gabriel |
|------|--------|-------------|-------------------|
| Essentials | $19/mes | Rutina IA + pautas alimentación + vídeos ejercicios | Nada |
| Pro | $49/mes | Todo Essentials + Coach IA 24/7 + revisión semanal + audio feedback + Discord | ~5 min/persona/semana |
| Elite | $149/mes | Todo Pro + videollamada mensual + WhatsApp directo (máx 10 plazas) | ~2h/persona/mes |

Pagos en **USD** desde día 1 (España + LATAM).
OXXO activado para México.
Opción trimestral para métodos no recurrentes.

---

## Schema de base de datos (tablas principales)

### `profiles` (extensión de auth.users)
```sql
id uuid references auth.users
full_name text
email text
avatar_url text
subscription_tier text  -- 'essentials' | 'pro' | 'elite'
stripe_customer_id text
onboarding_completed boolean default false
created_at timestamptz
```

### `client_profiles` (datos fitness del cliente)
```sql
id uuid
user_id uuid references profiles(id)
sex text  -- 'male' | 'female'
age int
weight_kg numeric
height_cm numeric
goal text  -- 'lose_fat' | 'gain_muscle' | 'recomposition' | 'maintain'
activity_level text  -- 'sedentary' | 'light' | 'moderate' | 'active'
training_days_per_week int  -- 2 | 3
training_experience text  -- 'beginner' | 'intermediate' | 'advanced'
equipment_access text  -- 'full_gym' | 'home_basic' | 'home_full'
preferred_fasting_time text  -- 'morning' | 'evening'
big_meal_preference text  -- 'lunch' | 'dinner'
injuries text[]
medical_conditions text[]
parq_completed boolean default false
parq_cleared boolean default false
target_calories int
target_protein_g int
target_carbs_g int
target_fat_g int
created_at timestamptz
updated_at timestamptz
```

### `training_programs` (programa de 12 semanas)
```sql
id uuid
user_id uuid references profiles(id)
program_type text  -- 'upper_lower' | 'push_pull_legs' | 'full_body'
start_date date
end_date date
current_week int
status text  -- 'active' | 'completed' | 'paused'
program_data jsonb  -- estructura del programa generado por IA
created_at timestamptz
```

### `training_logs` (registros de cada sesión)
```sql
id uuid
user_id uuid references profiles(id)
program_id uuid references training_programs(id)
session_date date
session_type text  -- 'upper' | 'lower' | 'push' | 'pull' | 'legs' | 'full_body'
exercises jsonb  -- [{exercise, warmup_weight, warmup_reps, work_weight, work_reps, partial_reps, notes}]
duration_minutes int
energy_level int  -- 1-10
completed boolean
created_at timestamptz
```

### `weekly_checkins` (check-ins semanales)
```sql
id uuid
user_id uuid references profiles(id)
week_number int
weight_kg numeric
waist_cm numeric
chest_cm numeric
hip_cm numeric
avg_steps_per_day int
avg_sleep_hours numeric
energy_level int  -- 1-10
adherence_pct int  -- 0-100
notes text
photo_url text  -- Supabase Storage
created_at timestamptz
```

### `coach_conversations` (historial chat IA)
```sql
id uuid
user_id uuid references profiles(id)
messages jsonb  -- [{role, content, timestamp}]
tokens_used int
created_at timestamptz
updated_at timestamptz
```

### `ai_request_logs` (control de costes IA)
```sql
id uuid
user_id uuid references profiles(id)
request_type text  -- 'coach_chat' | 'program_generation' | 'meal_suggestion'
tokens_input int
tokens_output int
cost_usd numeric
created_at timestamptz
```

---

## Flujo de onboarding

```
1. Cliente se registra (email + password)
2. PAR-Q (cuestionario de salud) — si marca condiciones de riesgo → "consulta con un profesional"
3. Datos personales: edad, sexo, peso, altura, nivel actividad
4. Objetivo: perder grasa / ganar músculo / recomposición / mantenerse
5. Preferencias: días entrenamiento (2/3), ayuno mañana/noche, comida grande almuerzo/cena
6. Equipo: gym completo / casa básico / casa completo
7. IA calcula: TMB (Mifflin-St Jeor) → TDEE → macros según objetivo → genera programa 12 semanas
8. Cliente ve su dashboard con rutina del día + plato FORZZA sugerido
```

---

## Coach IA FORZZA

**Modelo**: Claude API (sonnet para chat, opus para generación de programas)
**Personalidad**: habla como Gabriel — directo, motivador, sin rodeos, estilo "bro" pero con sustancia
**Disponible para**: tiers Pro y Elite

### Guardrails del Coach IA
- NUNCA diagnosticar enfermedades ni recomendar fármacos/suplementos médicos
- NUNCA dar pautas para personas con patologías (diabetes, TCA, cardiopatías) → derivar a profesional
- NUNCA usar las palabras "entrenador personal", "nutricionista", "dieta", "paciente", "tratamiento"
- SÍ usar: "método", "sugerencia", "pauta", "rutina", "estilo de vida", "lo que nos funciona"
- SIEMPRE recordar que es contenido educativo basado en experiencia personal
- Informar que es una IA (obligación AI Act Art. 50 desde agosto 2026)
- Si el usuario reporta dolor, lesión o malestar → "Para, descansa y consulta con un profesional de la salud"

---

## Compliance legal

### Marco legal
- **Modelo**: venta de contenido educativo ("acceso al Método FORZZA"), NO servicio profesional de entrenamiento
- **CNAE**: 8551 (Educación deportiva y recreativa) o 8559 (Otra educación n.c.o.p.)
- **Gabriel**: basado en Madrid, cursando TSAF (Técnico Superior en Acondicionamiento Físico, título oficial del Ministerio de Educación, validez nacional). Le quedan ~3 meses.
- **Rubén**: socio tecnológico en Valencia. No presta servicios deportivos.
- **La Ley 2/2022 de Valencia NO aplica**: Gabriel está en Madrid y la venta es por internet.
- **Ley de Unidad de Mercado (2013)**: si en Cataluña se puede ejercer con TSAF, también en Madrid.

### Estructura societaria
- **Fase MVP**: Comunidad de Bienes (CB) — ~€80/mes cada uno de autónomo
- **Fase escala (>€3-4K/mes)**: Sociedad Limitada
- **Cuenta bancaria**: Revolut Business a nombre de la CB, multi-moneda (USD para LATAM)

### Disclaimers obligatorios (en toda la plataforma)
1. "El contenido de esta plataforma tiene fines exclusivamente informativos y educativos. No constituye asesoramiento médico, deportivo profesional ni nutricional personalizado."
2. "Consulte siempre con su médico antes de comenzar cualquier programa de ejercicio o cambiar su alimentación."
3. "Los planes son generados por inteligencia artificial. El acceso a esta plataforma no establece relación profesional de entrenamiento personal ni consulta nutricional."
4. "La plataforma no está destinada a personas con patologías, lesiones activas, embarazo o condiciones médicas que requieran supervisión profesional."

### PAR-Q (Physical Activity Readiness Questionnaire)
Obligatorio en onboarding. Si el usuario marca alguna condición de riesgo → no generar programa, derivar a profesional.

### RGPD
- Datos de peso/altura/objetivo = posibles datos de salud (categoría especial)
- Consentimiento explícito (Art. 9.2.a RGPD) en onboarding
- DPIA (Evaluación de Impacto) antes del lanzamiento
- Supabase región París (datos en UE)

### AI Act (desde agosto 2026)
- Art. 50: informar claramente que el Coach IA es una IA
- Etiquetar contenido generado por IA
- Sistema clasificado como riesgo limitado (no alto riesgo)

### Seguro RC
- Obligatorio — ~€80-200/año
- Verificar cobertura de actividad online

---

## Reglas de desarrollo

### Convenciones de código
- **TypeScript estricto** en todo. Sin `any`.
- **Zod** para validación de todos los inputs
- **Server Actions** de Next.js 15 para mutaciones
- Estructura feature-based (`src/features/`)

### Supabase y seguridad
- **RLS activado en TODAS las tablas** desde el primer día
- Patrón RLS: `(select auth.uid()) = user_id`
- Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente

### IA y Claude API
- Chat: streaming SSE
- Siempre capturar tokens_used y guardar en `ai_request_logs`
- Rate limiting por tier: Essentials = 0 chats, Pro = 50/día, Elite = ilimitado
- Timeout: 30 segundos por request

### Al final de CADA prompt
- ESLint fix SIEMPRE: `npx eslint --fix [archivo]`
- Commit y push SIEMPRE: `git add -A && git commit -m "..." && git push origin main`
- Supabase CLI no configurado — migraciones vía Studio SQL Editor

### Skills UI
- Leer SIEMPRE antes de cualquier componente: frontend-design, polish, animate, colorize, UI UX Pro Max
- Skills disponibles en `.agents/skills/`

---

## Separación total con Dietly

- **Repos separados** — nunca mezclar
- **Sesiones Claude completamente aisladas**
- **No importar código de Dietly** — solo copy-paste de patrones (SSE streaming, PWA, Stripe)
- **Supabase separado** — proyecto nuevo, región París
- **Stripe separado** — cuenta nueva o productos separados
- **API key Anthropic** — puede ser la misma cuenta, pero tracking separado

---

---

## Lecciones aprendidas de Dietly — NO repetir estos errores

### Seguridad
- NUNCA exponer API keys en el cliente — todas en server-side
- NUNCA dejar endpoints de test accesibles en producción
- RLS desde el DÍA 1 en TODAS las tablas — no después
- HMAC tokens para rutas públicas
- XSS: sanitizar todo input del usuario antes de renderizar
- CSP y HSTS headers desde el primer deploy
- Auth obligatoria en TODOS los endpoints de API que acceden a datos
- Delete de recursos SIEMPRE con filtro de ownership (user_id = auth.uid())

### Validación
- Zod en TODAS las rutas de API desde el día 1, no después
- Rate limiting real desde el día 1
- Verificar consentimiento del usuario antes de llamar a APIs de IA

### Performance
- NO usar force-dynamic en root layout
- Paralelizar queries en dashboard con Promise.all
- Error boundaries en todos los componentes async
- Loading skeletons, no spinners genéricos

### Base de datos
- Verificar que TODAS las migraciones están aplicadas en producción
- No dejar migraciones pendientes de verificar
- Un solo directorio /libs/ — no duplicar /lib/ y /libs/
- Eliminar queries duplicadas desde el inicio

### UI/UX
- No hardcodear colores de dark mode — usar variables CSS desde el inicio
- Todos los paneles renderizados simultáneamente con display:none toggle
- Banner de cookies no-blocking desde el día 1
- PWA: detectar iOS/Android para instrucciones de instalación específicas

### Código
- ESLint fix SIEMPRE al final — nunca deployar con warnings
- Commit y push SIEMPRE al final — nunca dejar trabajo sin subir
- No acumular deuda técnica: si ves 2 archivos haciendo lo mismo, unifica YA




## Variables de entorno necesarias

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (USD)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ESSENTIALS_ID=
STRIPE_PRICE_PRO_ID=
STRIPE_PRICE_ELITE_ID=

# Anthropic
ANTHROPIC_API_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Cuentas de Instagram

- **@forzzacademy** (1.4K seguidores) — donde Gabriel crea todo el contenido (reels, método, testimonios, CTAs a la app)
- **@gabrielherreram_** (12K seguidores) — cuenta personal, deriva tráfico a @forzzacademy

---

## Estado actual del proyecto

**Fase**: Pre-desarrollo
**Gabriel**: cursando TSAF, ~3 meses para terminar
**Rubén**: preparando arquitectura técnica

### Timeline
| Fase | Duración | Qué pasa |
|------|----------|----------|
| Validación | Semana 1-4 | Gabriel lanza 10 plazas beta a $29 por WhatsApp/Bizum |
| Definición | Semana 2-3 | Gabriel define método en detalle, Rubén empieza a construir |
| Desarrollo | Semana 4-6 | Rubén construye la app, Gabriel sigue con contenido en @forzzacademy |
| Lanzamiento | Semana 7-8 | App lista, lanzamos a los 12K seguidores |

### Pendiente
- [ ] Decidir y registrar dominio (forzza.app u otro)
- [ ] Gabriel termina TSAF (~3 meses)
- [ ] System prompt del Coach IA con el método completo
- [ ] T&Cs y disclaimers legales finales
- [ ] Contrato de partnership CB
- [ ] Abrir cuenta Revolut Business a nombre de la CB
- [ ] Crear proyecto Supabase
- [ ] Configurar Stripe en USD con OXXO
- [ ] Primer deploy en Vercel

---

## Proyecciones financieras

| Período | Miembros | Revenue/mes | Costes | Neto |
|---------|----------|-------------|--------|------|
| Mes 1-2 | 10-20 | $580 | ~$100 | ~$480 |
| Mes 3-4 | 50-80 | $2.320 | ~$150 | ~$2.170 |
| Mes 6 | 120-150 | $5.100 | ~$200 | ~$4.900 |
| Mes 12 | 200-300 | $10.200 | ~$300 | ~$9.900 |

Basado en conversión 1-2% de 12K seguidores, ticket medio ~$34/mes.
Margen: 95%+.
