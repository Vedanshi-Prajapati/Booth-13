import React, { useState, useEffect } from 'react';
import { ScreenHeaderNav } from './components/CursedBooth/ScreenHeaderNav';
import { ScreenLanding } from './components/CursedBooth/ScreenLanding';
import { ScreenCustomize } from './components/CursedBooth/ScreenCustomize';
import { ScreenCountdown } from './components/CursedBooth/ScreenCountdown';
import { ScreenDeveloping } from './components/CursedBooth/ScreenDeveloping';
import { ScreenPhotoViewer } from './components/CursedBooth/ScreenPhotoViewer';
import { ScreenRevelation } from './components/CursedBooth/ScreenRevelation';
import { ScreenPhotoStrip } from './components/CursedBooth/ScreenPhotoStrip';
import { ScreenActions } from './components/CursedBooth/ScreenActions';
import { ScreenOverviewGrid } from './components/CursedBooth/ScreenOverviewGrid';
import { soundEngine } from './utils/audio';
import './styles/screens.css';

export function App() {
  const getScreenFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'landing';
  };

  const [currentScreen, setCurrentScreen] = useState(getScreenFromHash);
  const [isMuted, setIsMuted] = useState(true);

  // Sync hash changes
  useEffect(() => {
    const onHashChange = () => {
      const screen = window.location.hash.replace('#', '');
      if (screen) setCurrentScreen(screen);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectScreen = (screenId) => {
    setCurrentScreen(screenId);
    window.location.hash = screenId;
    soundEngine.setScreen(screenId);
  };

  // Sync screen changes to soundEngine reactive BGM
  useEffect(() => {
    soundEngine.setScreen(currentScreen);
  }, [currentScreen]);

  // Back button navigation logic
  const handleGoBack = React.useCallback(() => {
    switch (currentScreen) {
      case 'customize':
        handleSelectScreen('landing');
        break;
      case 'countdown':
      case 'developing':
      case 'photo1':
        handleSelectScreen('customize');
        break;
      case 'photo2':
        handleSelectScreen('photo1');
        break;
      case 'photo3':
        handleSelectScreen('photo2');
        break;
      case 'photo4':
        handleSelectScreen('photo3');
        break;
      case 'revelation':
        handleSelectScreen('photo4');
        break;
      case 'strip':
        handleSelectScreen('revelation');
        break;
      case 'actions':
        handleSelectScreen('strip');
        break;
      case 'overview':
        handleSelectScreen('landing');
        break;
      default:
        handleSelectScreen('landing');
        break;
    }
  }, [currentScreen]);

  // Character Customization state
  const [customization, setCustomization] = useState({
    face: 'witch',
    head: 'witch_hat',
    outfit: 'robe',
    prop: 'candle',
    background: 'curtains'
  });

  const handleUpdateCustomization = (category, value) => {
    setCustomization(prev => ({
      ...prev,
      [category]: value
    }));
    soundEngine.playTick();
  };

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        handleToggleSound();
      } else if (e.key === 'Escape' && currentScreen !== 'landing') {
        handleGoBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, handleGoBack]);

  // Render the active screen
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <ScreenLanding
            onEnter={() => handleSelectScreen('customize')}
            isMuted={isMuted}
            onToggleSound={handleToggleSound}
          />
        );

      case 'customize':
        return (
          <ScreenCustomize
            customization={customization}
            onUpdateCustomization={handleUpdateCustomization}
            onStepInside={() => handleSelectScreen('countdown')}
          />
        );

      case 'countdown':
        return (
          <ScreenCountdown
            onComplete={() => handleSelectScreen('developing')}
          />
        );

      case 'developing':
        return (
          <ScreenDeveloping
            onComplete={() => handleSelectScreen('photo1')}
          />
        );

      case 'photo1':
        return (
          <ScreenPhotoViewer
            photoIndex={0}
            customization={customization}
            onNext={() => handleSelectScreen('photo2')}
            onPrev={() => handleSelectScreen('customize')}
          />
        );

      case 'photo2':
        return (
          <ScreenPhotoViewer
            photoIndex={1}
            customization={customization}
            onNext={() => handleSelectScreen('photo3')}
            onPrev={() => handleSelectScreen('photo1')}
          />
        );

      case 'photo3':
        return (
          <ScreenPhotoViewer
            photoIndex={2}
            customization={customization}
            onNext={() => handleSelectScreen('photo4')}
            onPrev={() => handleSelectScreen('photo2')}
          />
        );

      case 'photo4':
        return (
          <ScreenPhotoViewer
            photoIndex={3}
            customization={customization}
            onNext={() => handleSelectScreen('revelation')}
            onPrev={() => handleSelectScreen('photo3')}
          />
        );

      case 'revelation':
        return (
          <ScreenRevelation
            onProceed={() => handleSelectScreen('strip')}
          />
        );

      case 'strip':
        return (
          <ScreenPhotoStrip
            customization={customization}
            onProceed={() => handleSelectScreen('actions')}
          />
        );

      case 'actions':
        return (
          <ScreenActions
            customization={customization}
            onTakeAnother={() => handleSelectScreen('landing')}
          />
        );

      case 'overview':
        return (
          <ScreenOverviewGrid
            customization={customization}
            onSelectScreen={(screenId) => handleSelectScreen(screenId)}
          />
        );

      default:
        return <ScreenLanding onEnter={() => handleSelectScreen('customize')} />;
    }
  };

  return (
    <div className="cursed-booth-app">
      {/* Sleek Header with Back Button and Audio Control (No Pills, No Emojis) */}
      <ScreenHeaderNav
        currentScreen={currentScreen}
        onGoBack={handleGoBack}
        onSelectScreen={handleSelectScreen}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      <main className="screen-viewport">
        {renderCurrentScreen()}
      </main>
    </div>
  );
}

export default App;
