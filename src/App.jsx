import React, { useState, useEffect, useMemo } from 'react';

const COURSES = {
  'mineria-submarina': {
    id: 'mineria-submarina',
    title: 'Minería Submarina: Aspectos Legales y Regulatorios',
    subtitle: 'Explora el marco jurídico y los desafíos de la minería de aguas profundas.',
    instructor: 'Daniel Rincón',
    instructorBio: 'Abogado con un máster (LLM) en Derecho Energético y Ambiental de la Universidad de Lovaina, Bélgica. Asesor legal regulatorio en sostenibilidad para ADI, y asesoría legal estratégica a GSR, la división de minería submarina del grupo DEME.',
    duration: '12 horas',
    difficulty: 'Avanzado',
    image: 'https://placehold.co/600x400/1d4ed8/ffffff?text=Minería+Submarina',
    modules: [
      {
        id: 'modulo-1',
        title: 'Módulo I: Nociones Técnicas',
        description: 'Introducción, conceptos clave, panorama global y los diferentes tipos de minerales. Explora la tecnología offshore y onshore y los desafíos técnicos de la industria.',
        lessons: [
          { id: 'leccion-1-1', title: 'Contexto y Demanda de Minerales', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'La minería de aguas profundas (MAD) o minería submarina, es la exploración y explotación de minerales de alta ley a una profundidad superior a los 200 metros... Esta industria incipiente enfrenta desafíos significativos, desde la necesidad de tecnologías innovadoras para la extracción en condiciones extremas, hasta la falta de un marco legal internacional y nacional consolidado que aborde el impacto ambiental y social de la actividad.' },
          { id: 'leccion-1-2', title: 'Tipos de Minerales Submarinos', videoUrl: 'https://www.youtube.com/embed/yW-HlC72L-o', content: 'Hay tres tipos principales de depósitos de minerales de aguas profundas: nódulos polimetálicos, sulfatos masivos marinos y costras de ferromanganeso.' },
          { id: 'leccion-1-3', title: 'Tecnología de Exploración y Extracción', videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A', content: 'La exploración de nódulos polimetálicos incluye levantamientos topográficos con ecosondas multihaz y muestreo de nódulos y sedimentos. La recolección se realiza con vehículos submarinos (Harvesters) que transportan los minerales a la superficie.' },
        ],
        quiz: {
          questions: [
            { question: '¿Cuál es la profundidad a la que se considera minería submarina?', options: ['Menos de 100m', 'Más de 200m', 'Entre 50-150m'], answer: 'Más de 200m' },
            { question: '¿Cuál de los siguientes no es un tipo de mineral submarino?', options: ['Nódulos Polimetálicos', 'Costras de Ferromanganeso', 'Silicatos Masivos Marinos'], answer: 'Silicatos Masivos Marinos' },
          ]
        }
      },
      {
        id: 'modulo-2',
        title: 'Módulo II: Marco Legal y Regulatorio',
        description: 'Análisis de la CONVEMAR, la ISA, y los procedimientos de licencias y contratos. Se revisan los desarrollos históricos y la legislación nacional.',
        lessons: [
          { id: 'leccion-2-1', title: 'Principios y Normas Internacionales', videoUrl: 'https://www.youtube.com/embed/vH4D04x5_B0', content: 'Sección sobre los principios de "Patrimonio Común de la Humanidad" y el rol de la CONVEMAR.' },
          { id: 'leccion-2-2', title: 'La Autoridad Internacional de los Fondos Marinos (ISA)', videoUrl: 'https://www.youtube.com/embed/79-H255V2vI', content: 'Descripción detallada de la estructura, funciones y procedimientos de la ISA.' },
        ],
        quiz: {
          questions: [
            { question: '¿Qué convención establece los principios de la minería submarina?', options: ['Convenio de Estambul', 'UNCLOS', 'Protocolo de Kioto'], answer: 'UNCLOS' },
            { question: '¿Cuál es el rol de la ISA?', options: ['Explorar el fondo marino', 'Administrar los recursos del Área en beneficio de la humanidad', 'Concesionar proyectos energéticos terrestres'], answer: 'Administrar los recursos del Área en beneficio de la humanidad' },
          ]
        }
      },
      {
        id: 'modulo-3',
        title: 'Módulo III: Desafíos Legales y Caso Práctico',
        description: 'Examina las tendencias regulatorias, riesgos económicos y la influencia de ONG. El módulo concluye con un caso práctico.',
        lessons: [
          { id: 'leccion-3-1', title: 'Riesgos Ambientales y Económicos', videoUrl: 'https://www.youtube.com/embed/d3W5f8f3uE0', content: 'Discusión de los riesgos ambientales como la pérdida de biodiversidad y las plumas de sedimento.' },
          { id: 'leccion-3-2', title: 'Caso Práctico: Denegación de un Plan', videoUrl: 'https://www.youtube.com/embed/S2C_eWp1t2M', content: 'Análisis de un caso hipotético de denegación de un plan de trabajo por parte de la ISA.' },
        ],
        quiz: {
          questions: [
            { question: 'Según el caso práctico, ¿qué entidad adopta una moratoria para rechazar la solicitud de un contratista?', options: ['La ONU', 'La OPEP', 'El Consejo de la ISA'], answer: 'El Consejo de la ISA' },
            { question: '¿Quién es el instructor de este curso?', options: ['Daniel Rincón', 'Jane Doe', 'John Smith'], answer: 'Daniel Rincón' },
          ]
        }
      },
    ]
  },
  'derecho-comunidades-energeticas': {
    id: 'derecho-comunidades-energeticas',
    title: 'Derecho de las Comunidades Energéticas Globales',
    subtitle: 'Analiza la regulación y los modelos de gobernanza de proyectos energéticos a escala global.',
    image: 'https://placehold.co/600x400/34d399/ffffff?text=Comunidades+Energéticas',
  },
  'minerales-estrategicos': {
    id: 'minerales-estrategicos',
    title: 'Regulación de Minerales Estratégicos y su Impacto Legal',
    subtitle: 'Profundiza en la regulación del comercio y la extracción de minerales críticos.',
    image: 'https://placehold.co/600x400/9ca3af/ffffff?text=Minerales+Estratégicos',
  },
};

// Simple mock user and state management for a single user
const userId = 'mock-user-123';
const initialProgress = {
  [userId]: {
    'mineria-submarina': {
      completedLessons: [],
      completedModules: [],
      passedQuizzes: [],
    }
  }
};

// Moved to global scope to be accessible by useMemo
const getCourseProgress = (progress, courses, courseId) => {
  const course = progress?.[courseId];
  if (!course) return 0;
  const totalLessons = courses[courseId].modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const completedLessons = course.completedLessons.length;
  return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
};

const App = () => {
  const [view, setView] = useState('home');
  const [loggedIn, setLoggedIn] = useState(true); // Mock login for demo
  const [progress, setProgress] = useState(initialProgress);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  const markLessonAsComplete = (courseId, lessonId) => {
    setProgress(prev => {
      const userProgress = prev[userId] || {};
      const courseProgress = userProgress[courseId] || { completedLessons: [], completedModules: [], passedQuizzes: [] };
      if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
      }
      return {
        ...prev,
        [userId]: {
          ...userProgress,
          [courseId]: courseProgress,
        }
      };
    });
  };

  const markModuleAsComplete = (courseId, moduleId) => {
    setProgress(prev => {
      const userProgress = prev[userId] || {};
      const courseProgress = userProgress[courseId] || { completedLessons: [], completedModules: [], passedQuizzes: [] };
      if (!courseProgress.completedModules.includes(moduleId)) {
        courseProgress.completedModules.push(moduleId);
      }
      return {
        ...prev,
        [userId]: {
          ...userProgress,
          [courseId]: courseProgress,
        }
      };
    });
  };

  const passQuiz = (courseId, quizId) => {
    setProgress(prev => {
      const userProgress = prev[userId] || {};
      const courseProgress = userProgress[courseId] || { completedLessons: [], completedModules: [], passedQuizzes: [] };
      if (!courseProgress.passedQuizzes.includes(quizId)) {
        courseProgress.passedQuizzes.push(quizId);
      }
      return {
        ...prev,
        [userId]: {
          ...userProgress,
          [courseId]: courseProgress,
        }
      };
    });
  };

  const isModuleUnlocked = (courseId, moduleId) => {
    const course = COURSES[courseId];
    if (!course) return false;
    const moduleIndex = course.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === 0) return true;
    const prevModuleId = course.modules[moduleIndex - 1].id;
    const quizId = `${prevModuleId}-quiz`;
    return progress[userId]?.[courseId]?.passedQuizzes?.includes(quizId);
  };

  const isQuizPassed = (courseId, moduleId) => {
    const quizId = `${moduleId}-quiz`;
    return progress[userId]?.[courseId]?.passedQuizzes?.includes(quizId);
  };

  const isCourseComplete = (courseId) => {
    const course = COURSES[courseId];
    if (!course || !progress[userId]?.[courseId]) return false;
    const totalModules = course.modules.length;
    const completedModules = progress[userId][courseId].completedModules.length;
    return totalModules > 0 && totalModules === completedModules;
  };

  const navigateTo = (newView, courseId, moduleId, lessonId) => {
    setView(newView);
    setSelectedCourse(courseId ? COURSES[courseId] : null);
    setSelectedModule(moduleId ? COURSES[courseId].modules.find(m => m.id === moduleId) : null);
    setSelectedLesson(lessonId ? COURSES[courseId].modules.find(m => m.id === moduleId).lessons.find(l => l.id === lessonId) : null);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard progress={progress[userId]} courses={COURSES} navigateTo={navigateTo} />;
      case 'course-detail':
        return <CourseDetail course={selectedCourse} navigateTo={navigateTo} />;
      case 'course-player':
        return <CoursePlayer
          course={selectedCourse}
          module={selectedModule}
          lesson={selectedLesson}
          progress={progress[userId]?.[selectedCourse.id]}
          markLessonAsComplete={markLessonAsComplete}
          markModuleAsComplete={markModuleAsComplete}
          passQuiz={passQuiz}
          isModuleUnlocked={isModuleUnlocked}
          isQuizPassed={isQuizPassed}
          navigateTo={navigateTo}
        />;
      case 'certificate':
        return <Certificate course={selectedCourse} navigateTo={navigateTo} />;
      default:
        return <CourseCatalog courses={COURSES} navigateTo={navigateTo} />;
    }
  };

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          <a href="#" onClick={() => navigateTo('home')}>Capacitación Legal</a>
        </h1>
        <nav className="space-x-4">
          <button onClick={() => navigateTo('home')} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Catálogo</button>
          {loggedIn && (
            <button onClick={() => navigateTo('dashboard')} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Mi Cuenta</button>
          )}
        </nav>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <Header />
      {renderView()}
    </div>
  );
};

const CourseCatalog = ({ courses, navigateTo }) => (
  <main>
    <header className="text-center mb-16 py-12 md:py-20 bg-white rounded-3xl shadow-md">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">Capacitación en Derecho de la Energía Internacional</h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Cursos especializados para abogados y profesionales que buscan dominar los desafíos legales y contractuales en el sector energético global.
      </p>
    </header>
    <section id="cursos" className="mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Nuestro Catálogo de Cursos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(courses).map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
            <p className="text-gray-500 mb-4 text-sm">{course.subtitle}</p>
            {course.id === 'mineria-submarina' && (
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">Destacado</span>
            )}
            <button onClick={() => navigateTo('course-detail', course.id)} className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">Ver Detalles</button>
          </div>
        ))}
      </div>
    </section>
  </main>
);

const CourseDetail = ({ course, navigateTo }) => (
  <main>
    <section className="bg-white p-6 md:p-10 rounded-xl shadow-md">
      <button onClick={() => navigateTo('home')} className="text-blue-600 font-medium mb-4 inline-block">&lt; Volver al Catálogo</button>
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="order-2 lg:order-1">
          <p className="mb-6 text-gray-700 leading-relaxed">
            {course.subtitle}
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-semibold text-gray-800">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-600">{course.instructorBio}</p>
          </div>
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <span>Duración: {course.duration}</span>
            <span>Certificación: Sí</span>
            <span>Dificultad: {course.difficulty}</span>
          </div>
          <button onClick={() => navigateTo('course-player', course.id, course.modules[0].id, course.modules[0].lessons[0].id)} className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">Inscribirse Ahora</button>
        </div>
        <div className="order-1 lg:order-2">
          <img src={course.image} alt={course.title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="mt-10">
        <h5 className="text-2xl font-bold text-gray-900 mb-4">Contenido del Curso</h5>
        <ul className="space-y-6">
          {course.modules.map(module => (
            <li key={module.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">{module.title}</p>
              <p className="text-gray-600 text-sm mt-1">{module.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </main>
);

const CoursePlayer = ({ course, module, lesson, progress, markLessonAsComplete, markModuleAsComplete, passQuiz, isModuleUnlocked, isQuizPassed, navigateTo }) => {
  if (!course || !module || !lesson) return <p>No course selected.</p>;

  const courseProgress = progress || { completedLessons: [], completedModules: [], passedQuizzes: [] };
  const isLessonComplete = courseProgress.completedLessons.includes(lesson.id);
  const totalLessonsInModule = module.lessons.length;
  const completedLessonsInModule = module.lessons.filter(l => courseProgress.completedLessons.includes(l.id)).length;
  const isModuleComplete = completedLessonsInModule === totalLessonsInModule;
  const showQuiz = isModuleComplete && !isQuizPassed(course.id, module.id);
  const nextModule = course.modules[course.modules.findIndex(m => m.id === module.id) + 1];

  const handleCompleteLesson = () => {
    markLessonAsComplete(course.id, lesson.id);
  };

  return (
    <main>
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <button onClick={() => navigateTo('course-detail', course.id)} className="text-blue-600 font-medium mb-4 inline-block">&lt; Volver al Curso</button>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{course.title}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <h4 className="text-xl md:text-2xl font-semibold mb-4">{lesson.title}</h4>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-6">
              <iframe
                src={lesson.videoUrl}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="prose max-w-none text-gray-700">
              <p>{lesson.content}</p>
            </div>
            {!isLessonComplete && (
              <button onClick={handleCompleteLesson} className="mt-6 py-2 px-6 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors">Marcar como Completado</button>
            )}

            {showQuiz && (
              <Quiz
                moduleId={module.id}
                questions={module.quiz.questions}
                passQuiz={() => {
                  passQuiz(course.id, module.id);
                  markModuleAsComplete(course.id, module.id);
                }}
              />
            )}
            
          </div>
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl">
            <h5 className="font-bold text-lg mb-4">Contenido del Curso</h5>
            <div className="space-y-4">
              {course.modules.map(mod => (
                <div key={mod.id} className="border-b border-gray-200 pb-4">
                  <h6 className="font-semibold text-gray-800">{mod.title}</h6>
                  {!isModuleUnlocked(course.id, mod.id) && <span className="text-sm text-yellow-500"> (Bloqueado)</span>}
                  <ul className="pl-4 mt-2 space-y-2 text-sm text-gray-600">
                    {mod.lessons.map(l => (
                      <li key={l.id} className={`flex items-center space-x-2 ${isModuleUnlocked(course.id, mod.id) ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} onClick={() => isModuleUnlocked(course.id, mod.id) && navigateTo('course-player', course.id, mod.id, l.id)}>
                        <svg className={`w-4 h-4 ${courseProgress.completedLessons.includes(l.id) ? 'text-green-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        <span>{l.title}</span>
                      </li>
                    ))}
                  </ul>
                  {isModuleComplete && !isQuizPassed(course.id, mod.id) && (
                     <p className="mt-2 text-sm text-yellow-600 font-semibold">Completa el cuestionario para desbloquear el siguiente módulo.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Quiz = ({ moduleId, questions, passQuiz }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (qIndex, value) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qIndex]: value }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) {
        correct++;
      }
    });
    setScore(correct);
    if (correct / questions.length > 0.5) { // Pass with > 50%
      passQuiz();
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h5 className="text-xl font-bold mb-4">Cuestionario del Módulo</h5>
      <p className="text-gray-600 mb-4">Responde correctamente para desbloquear el próximo módulo.</p>
      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold mb-2">{q.question}</p>
          <div className="space-y-2">
            {q.options.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={option}
                  checked={answers[i] === option}
                  onChange={() => handleChange(i, option)}
                  className="form-radio text-blue-600"
                  disabled={submitted}
                />
                <span className={`text-gray-700 ${submitted && answers[i] === q.answer ? 'text-green-600 font-bold' : submitted && answers[i] !== q.answer ? 'text-red-600' : ''}`}>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Enviar Respuestas</button>
      )}
      {submitted && (
        <div className="mt-4 p-4 rounded-lg bg-white">
          <p className="font-bold text-lg mb-2">Resultados: {score} de {questions.length} correctas</p>
          <p className={score / questions.length > 0.5 ? 'text-green-600' : 'text-red-600'}>
            {score / questions.length > 0.5 ? '¡Felicidades, has aprobado!' : 'Lamentablemente no has aprobado. Inténtalo de nuevo.'}
          </p>
          {score / questions.length <= 0.5 && (
            <button onClick={() => setSubmitted(false)} className="mt-2 py-2 px-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors">Reintentar</button>
          )}
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ progress, courses, navigateTo }) => {
  const enrolledCourses = useMemo(() => {
    return Object.keys(progress || {}).map(courseId => ({
      ...courses[courseId],
      progress: getCourseProgress(progress, courses, courseId),
    }));
  }, [progress, courses]);
  
  return (
    <section id="dashboard" className="mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Mi Dashboard de Aprendizaje</h3>
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Mis Cursos</h4>
        <div className="space-y-4 mb-8">
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-500">No estás inscrito en ningún curso.</p>
          ) : (
            enrolledCourses.map(course => (
              <div key={course.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">{course.title}</p>
                  <div className="progress-bar mt-2">
                    <div className="progress" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{course.progress.toFixed(0)}% Completado</p>
                </div>
                {course.progress === 100 ? (
                  <button onClick={() => navigateTo('certificate', course.id)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors">Ver Certificado</button>
                ) : (
                  <button onClick={() => navigateTo('course-detail', course.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Continuar</button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const Certificate = ({ course, navigateTo }) => {
  if (!course) return <p>No course specified for certificate.</p>;

  return (
    <section className="bg-white p-6 md:p-10 rounded-xl shadow-md text-center">
      <h3 className="text-3xl font-bold text-gray-900 mb-6">¡Certificado de Finalización!</h3>
      <div className="border-4 border-gray-900 p-8 md:p-12 rounded-lg bg-gray-50 max-w-2xl mx-auto">
        <p className="text-xl font-semibold mb-2">Este Certificado es presentado a</p>
        <p className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">LearnerName</p>
        <p className="text-lg text-gray-700 mb-6">por completar exitosamente el curso de</p>
        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{course.title}</p>
        <p className="text-sm text-gray-500">Emitido el {new Date().toLocaleDateString('es-ES')}</p>
      </div>
      <button onClick={() => navigateTo('dashboard')} className="mt-8 py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Volver al Dashboard</button>
    </section>
  );
};

export default App;
