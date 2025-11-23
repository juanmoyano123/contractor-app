# VALIDACIÓN: Referral SaaS para Contratistas (Trades Network Platform)

**Fecha de Validación:** 2025-11-02
**Validador:** Idea Validator Agent
**Estado:** INVESTIGAR MÁS (con tendencia a EXECUTE si se negocia precio correcto)

---

## 🎯 ANÁLISIS DE LA IDEA

### Declaración del Problema

**Problema que atacamos:**
Los contratistas especializados (plomeros, electricistas, techadores, HVAC) constantemente reciben solicitudes de trabajos fuera de su especialidad. Hoy esas oportunidades se pierden o se pasan informalmente a "un amigo que conozco", sin tracking, sin garantía de reciprocidad, y sin sistema para cobrar comisiones de referido. Resultado: dinero dejado sobre la mesa y relaciones comerciales basadas en favores sin retorno medible.

**¿Por qué es un problema real?**
- Los trades tienen alto customer acquisition cost (CAC) por Google Ads, Home Advisor, Thumbtack
- Un cliente satisfecho genera necesidades múltiples: hoy fontanería, mañana electricidad, luego HVAC
- Pasar un lead sin sistema = pérdida de comisión (típicamente 10-20% del job)
- No hay reciprocidad estructurada: "Yo te paso 10 clientes, tú me pasas 2"
- Sin tracking = sin accountability, relaciones se degradan

### Solución que Proporcionamos

Una red cerrada donde contratistas de confianza intercambian leads, la plataforma trackea el status del referido, cierra el loop de payout automáticamente, y genera métricas de ROI por cada relación comercial.

### Propuesta Funcional (qué hacen los usuarios con la app)

- Registran qué tipo de trabajos buscan y qué pueden ofrecer (matching de especialidades)
- Envían leads de clientes a partners dentro de la red (con datos de contacto + contexto)
- Reciben notificaciones de status: lead contactado → presupuesto enviado → trabajo cerrado
- Automatizan el cálculo y cobro de comisiones de referido (% acordado del job)
- Visualizan métricas: $ generado por referidos dados vs recibidos, balance de reciprocidad

### Primera Impresión (Honesta)

Este es un problema REAL con demanda probada. El modelo "referral network" funciona en múltiples industrias (agentes inmobiliarios con BoomTown, abogados con LawPay, médicos con redes de especialistas). Los números son pequeños ($31.5K TTM) pero el margen (84%) y el crecimiento orgánico sugieren product-market fit temprano.

**Red flag principal:** La adquisición en acquire.com indica que el fundador no logró escalar más allá del nicho inicial. Esto puede ser porque:
1. El mercado es más pequeño de lo que parece
2. Requiere ventas directas complejas (no es self-serve)
3. Network effects no se activaron orgánicamente
4. Fragmentación geográfica hace difícil la densidad crítica

---

## 🔍 BENCHMARKING: ¿Quién Ya Resolvió Esto?

### 1. Angi (antes Angie's List) + HomeAdvisor
- **Mercado:** USA/Canadá (dominante)
- **Qué resuelven:** Conexión de homeowners con contratistas verificados
- **Cómo lo resuelven:** Marketplace bidireccional - consumidores buscan, contratistas pagan por lead
- **Nivel de éxito:**
  - 🏆 **Líder dominante** - $1.5B revenue anual (IAC parent company)
- **Features core que los hacen exitosos:**
  1. **Reviews verificadas** - Confianza del consumidor (critical para trades)
  2. **Lead distribution** - Algoritmo que matchea necesidad con contratista local
  3. **Payment processing integrado** - Capturan transaction fee, no solo lead fee
- **Insight clave:** El modelo "pay per lead" funciona porque los contratistas ya gastan $200-500/lead en Google Ads. Angi cobra $15-80 dependiendo del trade.

### 2. Jobber
- **Mercado:** USA/Canadá (SaaS para trades)
- **Qué resuelven:** Software de gestión para home service businesses (scheduling, invoicing, payments)
- **Cómo lo resuelven:** Sistema operativo completo para el negocio del contratista
- **Nivel de éxito:**
  - 💪 **Strong competitor** - $100M+ ARR estimado, 200K+ usuarios
- **Features core:**
  1. **CRM + Scheduling** - El hub central de operaciones
  2. **Client Hub** - Portal del cliente con quotes, invoices, payment
  3. **Marketplace de partners** (reciente) - Permiten que contratistas se refieran entre sí
- **Insight clave:** Jobber está añadiendo funcionalidad de referral network DENTRO de su plataforma existente. Esto valida la demanda pero también indica que es una feature, no un producto standalone.

### 3. Buildertrend
- **Mercado:** USA (construcción residencial/comercial)
- **Qué resuelven:** Project management para constructores y contratistas grandes
- **Cómo lo resuelven:** Software de colaboración - general contractor coordina con subcontractors
- **Nivel de éxito:**
  - 💪 **Strong player** - $100M+ ARR, enterprise focus
- **Features core:**
  1. **Bid management** - GCs invitan subs a bidar en proyectos
  2. **Communication hub** - Mensajería, docs, RFIs centralizado
  3. **Budget tracking** - Control de costos por trade
- **Insight clave:** En el mercado de construcción, el modelo es "general contractor coordina múltiples trades". El referral es formal, no informal. Esto sugiere que el mercado objetivo podría ser residential contractors pequeños (1-10 empleados), no commercial.

### 4. Porch.com
- **Mercado:** USA
- **Qué resuelven:** Plataforma de home improvement + insurance + moving services
- **Cómo lo resuelven:** Partnerships con utilities, insurance companies que refieren clientes
- **Nivel de éxito:**
  - 🎯 **Niche player** - Público ($PRCH), ~$150M revenue pero no rentable
- **Features core:**
  1. **B2B2C model** - Venden a enterprises (utilities) que dan la plataforma a sus clientes
  2. **Project cost estimator** - Calculadora de precios por proyecto
  3. **Contractor matching** - Algoritmo de referral automatizado
- **Insight clave:** El modelo B2B2C (vender a utilities/insurance que refieren) es más escalable que B2C directo. Esto sugiere un pivot potencial.

### 5. Referral networks informales/regionales
- **Ejemplos:** BNI (Business Network International), grupos de WhatsApp/Facebook de contratistas locales
- **Qué resuelven:** Trust-based referrals en grupos cerrados
- **Cómo funcionan:** Reuniones presenciales semanales/mensuales, one person per specialty
- **Nivel de éxito:**
  - 🎯 **Modelo probado pero offline** - BNI cobra $500-800/año por membresía + chapter fees
- **Insight clave:** Los contratistas YA hacen esto de forma manual. BNI es exitoso porque añade estructura + accountability (obligación de dar X referidos/mes). El SaaS debe replicar esta accountability.

---

## 📊 LECTURA DE MERCADO

### Validación del Modelo

- ✅ **Modelo probado:** El problema es real. Angi, Jobber, Buildertrend confirman que contractors pagan por leads y coordinación.
- ⚠️ **Mercado emergente para referral peer-to-peer:** Las plataformas grandes hacen B2C (homeowner → contractor) o B2B (GC → subs). El modelo "contractor → contractor" es menos explotado digitalmente.
- 🔴 **Competencia indirecta fuerte:** Jobber añadiendo referral features significa que puede commoditizarse como feature, no producto.

### Interpretación del Mercado

El mercado valida que contractors pagan por leads ($15-500/lead según fuente). El modelo de referral network funciona offline (BNI), pero NO hay líder digital claro en el segmento "peer-to-peer contractor referrals". Esto es oportunidad O señal de que el mercado prefiere soluciones integradas (Jobber) en lugar de point solutions. Los números pequeños ($31.5K TTM) sugieren que el product-market fit está en fase temprana o limitado a un nicho geográfico.

---

## 💡 OPORTUNIDADES IDENTIFICADAS (Pensamiento Estratégico)

### ESTRATEGIA A: Replicación Directa + Expansión Geográfica

**Qué es:** Tomar el modelo actual (referral SaaS) que funciona en [mercado actual del seller] y replicarlo sistemáticamente en ciudades/estados adicionales con estrategia de "land and expand" por metro.

**Ejemplo concreto:**
"Si el SaaS actual tiene 50 contractors en Austin, TX generando $31.5K/año, replicar el mismo playbook en Houston, Dallas, San Antonio (Texas metros grandes). Una vez que tienes densidad en Texas, expandir a Florida, Carolina del Norte (estados con high construction activity)."

**✅ Ventajas:**
- El producto ya está validado - no hay que rediseñar
- Playbook de onboarding ya existe (sabemos qué funciona)
- Trades es mercado enorme: $1.7 trillion en USA, 750K+ contractor businesses
- Network effects locales: entre más contractors en Austin, más valiosa es la red en Austin

**⚠️ Desafío principal:**
- **Adquisición de usuarios NO es orgánica a escala:** Pasar de 50 a 5000 contractors requiere sales team + marketing budget
- **Fragmentación geográfica:** Los referrals son hiperlocalizado (fontanero en Austin no refiere a electricista en Dallas)
- **Sales cycle largo:** Contractors son conservadores, adoption de nuevas herramientas es lento (3-6 meses típico)

**Veredicto:** **Potencial medio**

---

### ESTRATEGIA B: Pivot B2B2C - Vender a Trade Associations & Franchises ⭐ RECOMENDADA

**Qué es:** En lugar de vender contractor por contractor (B2B individual), vender la plataforma entera a associations, franchises, o buying groups que ya tienen networks de contratistas.

**Ejemplo concreto:**
- **Mercado original:** Vender a Joe's Plumbing, María's Electric, Bob's HVAC uno por uno
- **Pivot propuesto:** Vender a PHCC (Plumbing-Heating-Cooling Contractors Association) con 3,000 miembros, o a ServiceTitan's partner network, o a franchises como Mr. Rooter (franquicia de plomería con 200+ locations)

**Por qué tiene sentido:**
- **Distribución instantánea:** Una venta = 100-1000 contractors activados
- **Trust pre-existente:** La association/franchise ya validó la relación entre miembros
- **Budget más grande:** Associations tienen presupuesto para "member benefits software"
- **Activation más fácil:** El director de la association EXIGE que miembros usen la plataforma

**✅ Ventajas:**
- **Aceleración dramática de GTM:** 6-12 meses para cerrar 5 associations vs. 2-3 años para onboardear 500 contractors individuales
- **Revenue más predecible:** Contrato anual con association ($50K-200K/año) vs. $50-100/mes per contractor
- **Network effects garantizados:** Toda la association entra al mismo tiempo = densidad inmediata

**⚠️ Desafío principal:**
- **Sales cycle enterprise (9-12 meses):** Associations son organizaciones lentas, comités, aprobaciones
- **Customización requerida:** Cada association querrá su propio branding, rules de payout, features específicas
- **Dependencia en pocos clientes:** Perder 1 association = perder 500 contractors

**Veredicto:** **Alto potencial** (este es el pivot más inteligente)

---

### ESTRATEGIA C: Especialización Vertical Total - Solo HVAC o Solo Roofing

**Qué es:** Tomar el modelo genérico "referral para todos los trades" y especializarse 100% en UNA industria específica (HVAC o roofing son las más atractivas por tamaño de tickets + frecuencia de cross-sell).

**Ejemplo concreto:**
- **Modelo base:** Plataforma genérica para plumbers, electricians, HVAC, roofers, landscapers
- **Niche propuesto:** "RoofReferrals" - Solo para roofing contractors con features específicas:
  - Integration con software de inspección de techos (EagleView, Hover)
  - Tracking de storm leads (después de granizo/huracán, pico de demanda)
  - Network de restoration contractors (insurance claims requieren múltiples trades)

**Por qué el nicho es valioso:**
- **Roofing es $50B market en USA**, average ticket $8K-15K (alto valor = alto referral fee)
- **Seasonal + event-driven:** Después de tormentas, roofing contractors están saturados y necesitan pasar overflow
- **Cross-sell natural:** Roofing → Siding → Gutters → Windows
- **Menor competencia:** Nadie hace software específico de referrals para roofing

**✅ Ventajas:**
- **Messaging ultra-específico:** "Hecho para roofers" vs. "para todos los contractors"
- **Features diferenciados:** Integraciones con herramientas de roofing
- **Community más fuerte:** Roofers hablan lenguaje común, pain points similares

**⚠️ Desafío principal:**
- **Tamaño de mercado limitado:** 100K roofing contractors vs. 750K total contractors
- **Estacionalidad brutal:** 70% del revenue en Q2-Q3
- **Difícil expandirse después:** Pierde credibilidad si pivoteas a otros trades

**Veredicto:** **Potencial medio-alto** (funciona como beachhead, no como techo)

---

## 🎯 RECOMENDACIÓN ESTRATÉGICA

### La Estrategia Ganadora: B - Pivot B2B2C (Trade Associations + Franchises)

**Por qué esta es la mejor ruta:**

1. **Timing + eficiencia de capital:**
   - Con $31.5K TTM, no tienes runway para ground-up contractor acquisition en 50 ciudades
   - Una venta enterprise ($100K/año a una association) = 3x tu revenue actual en un solo deal
   - El seller ya demostró que el producto funciona; falta distribution leverage

2. **Network effects se activan INSTANTÁNEAMENTE:**
   - En modelo B2B individual: Año 1 = 10 users (red no sirve)
   - En modelo B2B2C: Día 1 = 300 contractors activados → red útil desde el primer día

3. **Ventana de oportunidad:**
   - Trade associations están digitalizando member benefits (post-COVID)
   - ServiceTitan, Jobber, Buildertrend NO tienen referral network como core feature todavía
   - Puedes posicionarte antes de que los grandes lo hagan

### Mercado Objetivo Específico

**Tier 1 (Primeros 12 meses):**
- Trade associations regionales (state-level): PHCC chapters, NECA chapters, ACCA chapters
- Tamaño ideal: 200-800 miembros
- Geografía: Sunbelt states (Texas, Florida, Arizona, Carolina del Norte)

**Tier 2 (Año 2-3):**
- Franchise systems: Mr. Rooter, Aire Serv, Molly Maid
- Buying groups: Contractor Nation, Service Roundtable

### Diferenciador Clave vs Competencia

"La única plataforma de referral network diseñada específicamente para que associations/franchises moneticen las conexiones entre sus miembros. No vendemos a contractors individuales - vendemos infraestructura de red a organizaciones que ya tienen la red."

---

## 🛠️ VIABILIDAD TÉCNICA CON CLAUDE CODE

### ¿Es viable construir esto con vibecoding?

⚠️ **Viable con limitaciones significativas**

**Qué ES viable con Claude Code:**
- CRUD de usuarios, leads, transacciones
- Dashboard de métricas básico
- Sistema de notificaciones (email/SMS via Twilio/SendGrid)
- Búsqueda y filtrado de contractors por trade/location
- Multi-tenancy básico (cada association tiene su vista)

**Qué NO es realísticamente viable (requiere expertise especializado):**
- **Stripe Connect (multi-party payments):** Complejidad alta - KYC, compliance, tax reporting
- **Mobile native apps:** Contractors trabajan desde el truck, necesitan mobile-first
- **Advanced matching algorithms:** ML para sugerir "mejor contractor para este lead"
- **Trust & safety systems:** Fraud detection, dispute resolution

### Evaluación Realista

**Para adquisición:** El código ya existe, Claude Code es perfecto para mantener/iterar.

**Para build from scratch:** Claude Code puede hacer MVP en 3-4 semanas, pero features como Stripe Connect necesitarán 8-12 semanas adicionales.

---

## 📋 STACK TECNOLÓGICO RECOMENDADO

### Frontend
- **Tech:** React (web) + React Native (mobile) O Progressive Web App (PWA)
- **Por qué:** Contractors necesitan mobile-first. PWA es más rápido que native apps.

### Backend
- **Tech:** Node.js (Express o Fastify) + TypeScript
- **Por qué:** Ecosystem maduro para payments (Stripe), real-time features (Socket.io)

### Base de Datos
- **Tech:** PostgreSQL → Deploy en Supabase o Railway
- **Por qué:**
  - Datos relacionales (users → leads → payouts → reviews)
  - Supabase da auth + realtime + storage out of the box

### Integraciones Críticas

1. **Stripe Connect** - Multi-party payouts
   - Complejidad: 🔴 Alta
   - Tiempo: 2-3 semanas

2. **Twilio (SMS)** - Notificaciones
   - Complejidad: 🟢 Baja
   - Tiempo: 2-3 días

3. **SendGrid (Email)** - Onboarding, digests
   - Complejidad: 🟢 Baja
   - Tiempo: 2 días

4. **Google Maps API** - Geolocation
   - Complejidad: 🟡 Media
   - Tiempo: 3-5 días

---

## 🎯 MVP V1 - FEATURES CORE

### Features No Negociables para V1

1. **Perfil de Contractor + Specialties**
   - Cada contractor: "Soy plomero, busco leads de electricistas"
   - Complejidad: 🟢 Baja
   - Tiempo: 3 días

2. **Lead Sharing + Status Tracking**
   - Enviar lead → Recibir notification → Actualizar status
   - Complejidad: 🟡 Media
   - Tiempo: 1 semana

3. **Payout Calculation + Tracking**
   - Calcular comisión → Generar invoice (V1: manual via Venmo)
   - Complejidad: 🟡 Media
   - Tiempo: 5 días

4. **Dashboard de Métricas**
   - "Referidos dados: 15 ($45K), Recibidos: 8 ($22K)"
   - Complejidad: 🟢 Baja
   - Tiempo: 4 días

5. **Network Discovery**
   - Buscar contractors por trade + location
   - Complejidad: 🟡 Media
   - Tiempo: 5 días

**Tiempo total estimado MVP V1:** **4-5 semanas** (con Claude Code, 1 developer full-time)

### Features Descartadas para V1

- Stripe Connect automation (demasiado complejo)
- Reviews & ratings (lanzar con invitation-only network)
- Mobile native apps (PWA es suficiente)
- CRM integrations (manual en V1)
- Advanced matching algorithm (búsqueda manual en V1)

**Filosofía del MVP:**
"Lanzamos con lo mínimo que demuestra si los contractors comparten leads y actualizan status. Si lo hacen, invertimos en automation."

---

## 📊 ANÁLISIS DE MODELO DE NEGOCIO

### Validación de Revenue Claims ($31.5K TTM)

**¿Son realistas estos números?**
✅ **Sí, son creíbles para ~50-100 usuarios**

**Breakdown estimado:**
- Pricing probable: $50-100/mes por contractor
- Usuarios necesarios: 26-52 usuarios pagando
- Profit margin 84% ($26.4K profit): Realista para bootstrapped SaaS

**⚠️ Red flag:**
- "Last month $2.5K revenue" = NO están creciendo (flat)
- Esto sugiere **churn = new signups** (plateau)

### Unit Economics

**LTV estimado:**
- Churn: 5-10% mensual
- Lifetime: 10-20 meses
- LTV: $750-1,200

**CAC estimado:**
- Actual (orgánico): $0-100
- Con paid ads: $300-800
- Con inside sales: $500-1,200

**⚠️ PROBLEMA:** Si CAC = $500 y LTV = $750, margen es delgado (1.5x ratio - necesitas 3x+)

**Conclusión:**
El modelo orgánico funciona (CAC ≈ $0). Para escalar con paid acquisition, necesitas:
1. Aumentar pricing ($100-150/mes)
2. Reducir churn (10% → 5%)
3. O pivotar a B2B2C (ACV $50K-200K)

---

## 🌐 EFECTOS DE RED Y MOAT

### ¿Tiene network effects reales?

**Teoría:** Más contractors → Más valiosa la plataforma

**Realidad:** ⚠️ **Network effects LOCALES, no globales**

**Por qué:**
- Referrals solo funcionan en área geográfica
- Necesitas masa crítica en CADA metro: 20-50 contractors
- 500 contractors dispersos en USA = red sin valor

**Implicación:**
Network effects tardan MUCHO en activarse (necesitas concentración geográfica)

### ¿Cuál es el moat real?

**Moat débil en modelo B2B individual:**
- ❌ No hay lock-in tecnológico
- ❌ No hay data moat
- ⚠️ Switching cost bajo

**Moat fuerte en modelo B2B2C:**
- ✅ Contract lock-in (1-3 años)
- ✅ Integration con association portal
- ✅ Data ownership (insights de miembros)

---

## 🚨 RIESGOS ESPECÍFICOS DEL NEGOCIO

### 1. Trust & Fraud Risk 🔴 CRÍTICO

**Problema:**
- Contractor B dice "job fue $5K" cuando realmente fue $10K
- O nunca paga la comisión

**Mitigación:**
- Require upload de invoice/receipt
- Sistema de reviews
- Escrow system (añade friction)

### 2. Fragmentación Geográfica 🟡 ALTO

**Problema:**
- Necesitas 30-50 contractors EN CADA CIUDAD
- 400+ metros en USA = necesitas 12K-20K contractors

**Mitigación:**
- Concentrarse en 5-10 metros
- Modelo B2B2C para activar metros completos

### 3. Estacionalidad 🟡 MEDIO

**Problema:**
- Q2-Q3 = peak
- Q4-Q1 = 30-50% menos actividad

**Mitigación:**
- Enfocarse en essential trades (HVAC, plomería)
- Subscription model (no transaction-based)

### 4. Competencia de Plataformas Grandes 🔴 CRÍTICO

**Problema:**
- Jobber añadiendo referral features
- ¿Por qué pagar por standalone SaaS?

**Mitigación:**
- Ser mejor/más profundo que su feature genérica
- Pivotar a B2B2C
- O ser adquirido por uno de los grandes

### 5. Regulatory & Compliance 🟡 MEDIO

**Problema:**
- Algunos estados requieren licenses para referral fees
- KYC/AML compliance con Stripe
- Tax reporting (1099 forms)

**Mitigación:**
- Consultar abogado especializado
- Usar Stripe Connect (manejan compliance)

---

## 🎬 VEREDICTO EJECUTIVO

### Decisión: ⚠️ INVESTIGAR MÁS (con tendencia a EXECUTE)

### Justificación

**✅ A FAVOR:**
1. Problema validado - contractors pagan $200-500/lead en ads
2. Modelo probado offline - BNI cobra $500-800/año
3. Números creíbles - $31.5K TTM con 84% margin
4. Competencia indirecta - nadie domina peer-to-peer contractor referrals

**❌ EN CONTRA:**
1. No están creciendo - flat revenue
2. Network effects débiles sin concentración geográfica
3. Switching cost bajo
4. Competencia de plataformas grandes (Jobber)
5. Unit economics frágiles si escalan con paid ads

### Condiciones para Ejecutar

**Si ADQUIERES:**
- **Precio máximo:** $45K-60K (1.5x-2x revenue)
- **Due diligence:** Verificar churn, usuarios activos, code quality

**Si CONSTRUYES:**
- **Ventaja:** Diseñar para B2B2C desde día 1
- **Desventaja:** 8-12 semanas vs producto funcionando hoy

**Confianza en la oportunidad:** **60%**

**Razonamiento:**
- Problema real, pero execution path incierto
- Modelo B2B individual tiene techo bajo (~$100K ARR)
- Modelo B2B2C tiene potencial alto ($1M-5M ARR), pero requiere sales enterprise

---

## 🚀 ESTRATEGIA DE CRECIMIENTO RECOMENDADA

### ESCENARIO A: Si Adquieres el Negocio

**Fase 1 (Meses 1-3): Estabilizar**
- NO tocar producto
- Hablar con usuarios actuales
- Entender qué valoran, dónde están

**Fase 2 (Meses 4-6): Pivotar a B2B2C**
- Rebuild con multi-tenancy
- White-label (branding de association)
- Admin panel para association manager
- Bulk onboarding (importar CSV)

**Fase 3 (Meses 7-12): Cerrar Primeras Associations**
- Contratar inside sales rep
- Target: State-level associations
- Pricing: $50K-100K/año
- Objetivo: 2 associations = $100K-200K nuevo ARR

**Fase 4 (Año 2): Escalar**
- 10-15 associations
- Franchises y buying groups
- Objetivo: $500K-1M ARR

**Inversión necesaria:** $150K-250K

**Ruta a $100K+ MRR:** 18-24 meses si ejecutas well

---

### ESCENARIO B: Si Construyes desde Cero

**Fase 1 (Semanas 1-8): Build MVP B2B2C**
- React + Node.js + PostgreSQL
- Multi-tenancy desde día 1
- Costo: Tu tiempo o $20K-40K

**Fase 2 (Meses 3-6): Pilot Gratis**
- Association pequeña (100-200 members)
- Objetivo: Probar modelo + testimonial

**Fase 3 (Meses 7-12): Monetizar**
- 2-3 associations pagando
- $30K-50K/año
- Objetivo: $90K-150K ARR

**Fase 4 (Año 2): Escalar**
- Igual que Escenario A

**Inversión necesaria:** $100K-200K

**Ruta a $100K+ MRR:** 24-30 meses

---

## 🎯 RECOMENDACIÓN FINAL

### ADQUIERE si:
- Precio: $40K-60K
- Code quality decente
- Usuarios engaged
- Capital: $150K-250K para pivot + growth

### CONSTRUYE si:
- Seller pide >$100K
- Code legacy/mal hecho
- Experiencia en trades/construction
- Prefieres diseñar para B2B2C desde día 1

### Mi Recomendación Personal

**ADQUIRIR a $50K-60K + Pivotar a B2B2C**

**Por qué:**
- Ahorras 2-3 meses desarrollo
- Tienes usuarios para entrevistar
- Mantienes $2.5K/mes mientras pivoteas
- Riesgo técnico bajo con Claude Code

---

## ⏱️ PRIMERA ACCIÓN (48 Horas)

### Si Consideras Adquisición

**Pedir al seller:**
1. Churn rate mensual (últimos 6 meses)
2. Distribución geográfica de usuarios
3. Top 3 features más usadas
4. Code walkthrough (1 hora)

**Research paralelo:**
- Llamar 3-5 trade associations
- Pitch: "¿Interés en plataforma de referral network para miembros?"
- Objetivo: Validar demand B2B2C

### Si Consideras Build

**Entrevistar:**
1. 10 contractors locales sobre cómo manejan referrals
2. 2-3 associations (mismo pitch)

### Próximo Gate de Validación

**Necesitas responder:**
1. ¿Alguna association mostró interés real? (Si 0 de 5 = difícil)
2. ¿Churn <10% mensual? (Si >15% = problema de PMF)
3. ¿Puedes adquirir por <$60K? (Si >$150K = no tiene sentido)

---

## 📈 ESTIMADOS DE DESARROLLO

**MVP básico:** 4-5 semanas con Claude Code

**Producto B2B2C completo:** 8-10 semanas con Claude Code
- Multi-tenancy
- White-label
- Admin features

**Features adicionales críticas:**
- Stripe Connect: +2-3 semanas
- Mobile optimization: +2-3 semanas
- CRM integrations: +1-2 semanas por CRM

---

**Fin del Reporte de Validación**

*Mercado analizado: USA (Contractor/Trades SaaS)*
*Modelo recomendado: B2B2C (Trade Associations + Franchises)*
*Confianza: 60% - Ejecutar con condiciones correctas*

**Próximo paso:** Validar demand B2B2C con 5 associations antes de comprometer capital.