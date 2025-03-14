import React, { useState } from 'react';
import './css/index.css';
// asumiendo que este archivo contiene estilos CSS

const FeatureCard = ({ icon, title, description, onClick }) => (
    <div className="feature-card" onClick={onClick}>
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p>{description}</p>
    </div>
);

const Modal = ({ id, title, content, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div id={id} className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{title}</h2>
                {content}
            </div>
        </div>
    );
};




export function IndexPage() {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalId) => setActiveModal(modalId);
    const closeModal = () => setActiveModal(null);

    return (
        <div className="container">
            <header>
                <div className="logo">Auto.Quest</div>
                <nav>
                    <ul>
                        <li><a href="/register/" className="cta-button">Registrarse</a></li>
                        <li><a href="/login" className="cta-button">Iniciar sesión</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <h1>¡Automatiza tus formularios!</h1>
                    <p>Auto.Quest genera cuestionarios personalizados a partir de tus archivos Markdown</p>
                    <a href="/login" className="cta-button">Comienza Ahora →</a>
                </section>

                <section id="features" className="features">
                    <FeatureCard
                        icon="🧠"
                        title="Markdown"
                        description="Genera tus formularios por medio de Markdown."
                        onClick={() => openModal('markdownModal')}
                    />
                    <FeatureCard
                        icon="📚"
                        title="Aprendizaje Personalizado"
                        description="Adapta los cuestionarios a tu ritmo y estilo de aprendizaje único."
                        onClick={() => openModal('personalizadoModal')}
                    />
                    <FeatureCard
                        icon="⚡"
                        title="Resultados Rápidos"
                        description="Obtén retroalimentación instantánea y mejora tu comprensión en tiempo real."
                        onClick={() => openModal('rapidoModal')}
                    />
                </section>

                <section className="closing-cta">
                    <h2>¿Listo para Transformar tu Educación?</h2>
                    <p>Únete a miles de estudiantes que ya están aprovechando el poder de Auto.Quest</p>
                </section>
            </main>

            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>

            <Modal
                id="markdownModal"
                title="Markdown para Formularios"
                isOpen={activeModal === 'markdownModal'}
                onClose={closeModal}
                content={
                    <>
                        <p>Auto.Quest utiliza Markdown para crear formularios de manera sencilla y eficiente. Aquí te explicamos cómo funciona:</p>
                        <pre>
{`# Seccion

## Pregunta 1
- [ ] Opción 1
- [ ] Opción 2
- [x] Opción 3

## Pregunta 2
- [ ] Opción A
- [ ] Opción B
- [x] Opción C`}
                        </pre>
                    </>
                }
            />

            <Modal
                id="personalizadoModal"
                title="Aprendizaje Personalizado"
                isOpen={activeModal === 'personalizadoModal'}
                onClose={closeModal}
                content={
                    <>
                        <p>Auto.Quest ofrece una experiencia de aprendizaje única y rápida:</p>
                        <ul>
                            <li>Sube tus archivos markdown</li>
                            <li>Reutiliza tus preguntas y formularios</li>
                            <li>Aplica tus formularios de forma rápida</li>
                            <li>Personaliza tus cuestionarios</li>
                        </ul>
                        <p>Con Auto.Quest, cada sesión de estudio se convierte en una experiencia personalizada y efectiva.</p>
                    </>
                }
            />

            <Modal
                id="rapidoModal"
                title="Resultados Rápidos"
                isOpen={activeModal === 'rapidoModal'}
                onClose={closeModal}
                content={
                    <>
                        <p>Auto.Quest te proporciona retroalimentación instantánea para maximizar tu aprendizaje:</p>
                        <ul>
                            <li>Corrección inmediata de respuestas</li>
                            <li>Estadísticas en tiempo real de tu rendimiento</li>
                            <li>Identificación instantánea de áreas que necesitan más atención</li>
                            <li>Sugerencias de repaso basadas en tus resultados</li>
                        </ul>
                        <p>Con esta retroalimentación rápida, puedes ajustar tu estrategia de estudio sobre la marcha y mejorar tu comprensión de forma eficiente.</p>
                    </>
                }
            />
        </div>
    );
}