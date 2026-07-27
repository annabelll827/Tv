<!DOCTYPE html>
<html lang="ku" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Tv - پەخشی تەلەڤیزیۆن</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" />
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        body {
            background: radial-gradient(circle at center, #1e1e2e 0%, #0d0d15 100%);
        }
        .code-input {
            background-color: transparent;
            border: 2px solid #4f46e5;
            border-radius: 9999px;
            color: white;
            font-size: 1.2rem;
            text-align: center;
            transition: all 0.3s ease;
        }
        .code-input:focus {
            box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
            outline: none;
        }
        .login-btn {
            background: linear-gradient(45deg, #4f46e5, #818cf8);
            color: white;
            border-radius: 9999px;
            transition: all 0.3s ease;
        }
        .login-btn:hover {
            box-shadow: 0 0 20px rgba(79, 70, 229, 0.7);
            transform: scale(1.02);
        }
        .video-js {
            width: 100%;
            height: 100%;
            border-radius: 0.75rem;
            overflow: hidden;
        }
        /* Hide scrollbars for clean look */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="min-h-screen font-sans text-slate-100 flex flex-col justify-between" 
      x-data="{ 
          isUnlocked: localStorage.getItem('amanj_tv_unlocked') === 'true', 
          accessKey: '', 
          errorMessage: false,
          currentTab: 'livetv',
          currentChannel: '',
          currentStream: '',
          isYoutube: false,
          youtubeUrl: '',
          searchQuery: '',
          selectedCategory: 'All',
          
          // Admin Panel State
          adminInput: '',
          isAdminUnlocked: localStorage.getItem('amanj_tv_admin') === 'true',
          adminError: false,
          newChannelName: '',
          newChannelUrl: '',
          newChannelImage: '',
          newChannelCategory: 'General',
          newChannelIsYt: false,
          
          // Edit State
          editingIndex: null,
          editName: '',
          editUrl: '',
          editImage: '',
          editCategory: 'General',
          editIsYt: false,
          
          // Channels List from localStorage
          channels: JSON.parse(localStorage.getItem('amanj_channels')) || [],

          get filteredChannels() {
              return this.channels.filter(ch => {
                  let matchesCategory = this.selectedCategory === 'All' || ch.category === this.selectedCategory;
                  let matchesSearch = ch.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                  return matchesCategory && matchesSearch;
              });
          },

          unlock() {
              if (this.accessKey.trim() === 'Callvin.Tv') {
                  this.isUnlocked = true;
                  localStorage.setItem('amanj_tv_unlocked', 'true');
                  this.errorMessage = false;
                  if (this.channels.length > 0) {
                      setTimeout(() => { this.changeChannel(this.channels[0].name, this.channels[0].url, this.channels[0].isYt); }, 200);
                  }
              } else {
                  this.errorMessage = true;
              }
          },
          logout() {
              this.isUnlocked = false;
              localStorage.removeItem('amanj_tv_unlocked');
              this.accessKey = '';
          },
          changeChannel(name, streamUrl, isYt = false) {
              this.currentChannel = name;
              this.isYoutube = isYt;
              if (isYt) {
                  this.youtubeUrl = streamUrl;
                  if (window.player) {
                      window.player.pause();
                  }
              } else {
                  this.currentStream = streamUrl;
                  if (window.player) {
                      window.player.src({ src: streamUrl, type: 'application/x-mpegURL' });
                      window.player.load();
                      window.player.play().catch(e => console.log('Auto-play prevented'));
                  }
              }
          },
          checkAdmin() {
              if (this.adminInput.trim() === '%ADMIN%AMANJ%TV%CREATE%') {
                  this.isAdminUnlocked = true;
                  localStorage.setItem('amanj_tv_admin', 'true');
                  this.adminError = false;
              } else {
                  this.adminError = true;
              }
          },
          lockAdmin() {
              this.isAdminUnlocked = false;
              localStorage.removeItem('amanj_tv_admin');
              this.adminInput = '';
          },
          handleImageUpload(event, type) {
              const file = event.target.files[0];
              if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                      if (type === 'new') {
                          this.newChannelImage = e.target.result;
                      } else if (type === 'edit') {
                          this.editImage = e.target.result;
                      }
                  };
                  reader.readAsDataURL(file);
              }
          },
          addChannel() {
              if (!this.newChannelName || !this.newChannelUrl) return;
              let badgeText = this.newChannelName.substring(0, 2).toUpperCase();
              
              const newCh = {
                  name: this.newChannelName,
                  url: this.newChannelUrl,
                  badge: badgeText,
                  image: this.newChannelImage || '',
                  category: this.newChannelCategory,
                  isYt: this.newChannelIsYt
              };

              this.channels.push(newCh);
              localStorage.setItem('amanj_channels', JSON.stringify(this.channels));

              if (this.channels.length === 1) {
                  this.changeChannel(newCh.name, newCh.url, newCh.isYt);
                  this.currentTab = 'livetv';
              }

              this.newChannelName = '';
              this.newChannelUrl = '';
              this.newChannelImage = '';
              this.newChannelCategory = 'General';
              this.newChannelIsYt = false;
              const imgInput = document.getElementById('channelImageInput');
              if (imgInput) imgInput.value = '';
          },
          startEdit(index) {
              this.editingIndex = index;
              const ch = this.channels[index];
              this.editName = ch.name;
              this.editUrl = ch.url;
              this.editImage = ch.image || '';
              this.editCategory = ch.category || 'General';
              this.editIsYt = ch.isYt || false;
          },
          cancelEdit() {
              this.editingIndex = null;
              this.editName = '';
              this.editUrl = '';
              this.editImage = '';
              this.editCategory = 'General';
              this.editIsYt = false;
          },
          saveEdit(index) {
              if (!this.editName || !this.editUrl) return;
              let badgeText = this.editName.substring(0, 2).toUpperCase();
              this.channels[index] = {
                  name: this.editName,
                  url: this.editUrl,
                  badge: badgeText,
                  image: this.editImage,
                  category: this.editCategory,
                  isYt: this.editIsYt
              };
              localStorage.setItem('amanj_channels', JSON.stringify(this.channels));
              this.cancelEdit();
          },
          deleteChannel(index) {
              this.channels.splice(index, 1);
              localStorage.setItem('amanj_channels', JSON.stringify(this.channels));
          },
          moveChannel(index, direction) {
              const newIndex = index + direction;
              if (newIndex < 0 || newIndex >= this.channels.length) return;
              const item = this.channels.splice(index, 1)[0];
              this.channels.splice(newIndex, 0, item);
              localStorage.setItem('amanj_channels', JSON.stringify(this.channels));
          }
      }">

    <div x-show="!isUnlocked" class="min-h-screen flex items-center justify-center p-4 w-full">
        <div class="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center text-center space-y-6">
            
            <div class="bg-slate-800 p-5 rounded-full shadow-inner">
                <svg class="w-14 h-14 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a5 5 0 0 1 5 5v1h1a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h1V7a5 5 0 0 1 5-5zm3 8V7a3 3 0 0 0-6 0v3h6zm-6 4a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm8 0a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
            </div>
            
            <div class="space-y-2">
                <h1 class="text-3xl font-extrabold text-white tracking-tight">Channels Locked</h1>
                <p class="text-slate-400 text-sm max-w-sm">
                    Default channels are hidden. Enter your Access Key to unlock and watch live TV.
                </p>
            </div>
            
            <input 
                type="text" 
                x-model="accessKey" 
                @keyup.enter="unlock()"
                class="code-input w-full px-6 py-4"
                placeholder="Enter Access Key"
            />

            <p x-show="errorMessage" class="text-red-500 text-xs font-semibold">کۆدی هەڵەیە! تکایە Callvin.Tv بنووسە</p>
            
            <button 
                @click="unlock()"
                class="login-btn w-full py-4 text-lg font-semibold shadow-lg shadow-indigo-600/20"
            >
                Unlock Channels
            </button>

        </div>
    </div>


    <div x-show="isUnlocked" class="flex flex-col min-h-screen justify-between" style="display: none;">
        
        <header class="bg-slate-900 border-b border-slate-800 py-3 px-4 md:px-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-3">
            <div class="flex items-center justify-between w-full md:w-auto">
                <h1 class="text-xl font-bold tracking-wide text-indigo-400 flex items-center gap-2">
                    <i class="fa-solid fa-tv"></i> Amanj TV
                </h1>
                <button @click="logout()" class="md:hidden bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                    لۆگۆت
                </button>
            </div>
            
            <div class="relative w-full md:w-80">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <i class="fa-solid fa-search"></i>
                </span>
                <input 
                    type="text" 
                    x-model="searchQuery" 
                    placeholder="Search channels..." 
                    class="w-full bg-slate-800/80 border border-slate-700/60 rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
                />
            </div>

            <button @click="logout()" class="hidden md:block bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-red-500/20 transition">
                لۆگۆت / داخستن
            </button>
        </header>

        <main x-show="currentTab === 'livetv'" class="max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6 my-auto">
            
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <template x-for="cat in ['All', 'Sports', 'News', 'Movies', 'General']">
                    <button @click="selectedCategory = cat" 
                            :class="selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/50'"
                            class="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer"
                            x-text="cat">
                    </button>
                </template>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div class="lg:col-span-2 flex flex-col gap-4">
                    <div class="bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-xl aspect-video w-full relative overflow-hidden">
                        <div x-show="!isYoutube" class="w-full h-full">
                            <video-js id="tvPlayer" class="vjs-big-play-centered" controls preload="auto" data-setup='{}'>
                                <source :src="currentStream" type="application/x-mpegURL" />
                            </video-js>
                        </div>
                        <div x-show="isYoutube" class="w-full h-full">
                            <iframe class="w-full h-full rounded-xl border-0" :src="youtubeUrl" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                            <h2 class="text-lg font-bold text-white" x-text="currentChannel || 'هیچ کەناڵێک هەڵنەبژێردراوە'"></h2>
                            <p class="text-xs text-slate-400 mt-1">پەخشی ڕاستەوخۆی بە کوالێتی بەرز</p>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col h-[480px]">
                    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <i class="fa-solid fa-tv"></i> کەناڵەکان (<span x-text="filteredChannels.length"></span>)
                    </h3>
                    
                    <div class="grid grid-cols-3 gap-3 overflow-y-auto pr-1">
                        <template x-for="(channel, index) in filteredChannels" :key="index">
                            <div @click="changeChannel(channel.name, channel.url, channel.isYt)" 
                                 class="bg-slate-800/60 border border-slate-700/50 p-2.5 rounded-xl flex flex-col items-center text-center cursor-pointer hover:bg-slate-800 transition group">
                                <template x-if="channel.image">
                                    <img :src="channel.image" class="w-12 h-12 rounded-xl object-cover mb-1.5 shadow group-hover:scale-105 transition" />
                                </template>
                                <template x-if="!channel.image">
                                    <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-700 flex items-center justify-center font-bold text-white mb-1.5 shadow group-hover:scale-105 transition" x-text="channel.badge"></div>
                                </template>
                                <span class="text-[11px] font-bold text-white truncate w-full" x-text="channel.name"></span>
                            </div>
                        </template>
                    </div>
                </div>

            </div>

        </main>

        <main x-show="currentTab === 'settings'" class="max-w-4xl w-full mx-auto p-4 md:p-6 my-auto" style="display: none;">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h2 class="text-xl font-bold text-white mb-2 flex items-center gap-2"><i class="fa-solid fa-gear text-indigo-400"></i> ڕێکخستنەکان و بەڕێوەبردنی کەناڵەکان</h2>
                <p class="text-xs text-slate-400 mb-6">بۆ زیادکردن، دەستکاری، گۆڕینی شوێن یان سڕینەوەی کەناڵەکان، تکایە کۆدی تایبەتی بەڕێوەبەر بنووسە.</p>

                <div x-show="!isAdminUnlocked" class="space-y-4 max-w-md mx-auto py-10 text-center">
                    <input 
                        type="text" 
                        x-model="adminInput" 
                        @keyup.enter="checkAdmin()"
                        class="code-input w-full px-6 py-3 text-sm"
                        placeholder="کۆدی بەڕێوەبەر بنووسە"
                    />
                    <p x-show="adminError" class="text-red-500 text-xs font-semibold">کۆدی بەڕێوەبەر هەڵەیە!</p>
                    <button @click="checkAdmin()" class="login-btn w-full py-3 font-semibold text-sm">چوونەژوورەوە بۆ بەڕێوەبردن</button>
                </div>

                <div x-show="isAdminUnlocked" class="space-y-6" style="display: none;">
                    <div class="flex justify-between items-center border-b border-slate-800 pb-4">
                        <span class="text-xs text-emerald-400 font-bold flex items-center gap-1"><i class="fa-solid fa-shield-halved"></i> دۆخی بەڕێوەبەر چالاکە</span>
                        <button @click="lockAdmin()" class="text-xs text-red-400 hover:underline">دەرچوون لە بەڕێوەبەر</button>
                    </div>

                    <div class="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl space-y-4">
                        <h3 class="text-sm font-bold text-white">زیادکردنی کەناڵی نوێ (ڕاستەوخۆ دەچێتە ناو پەرگەوە)</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" x-model="newChannelName" placeholder="ناوی کەناڵ (بۆ نموونە: Rudaw HD)" class="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500" />
                            <select x-model="newChannelCategory" class="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500">
                                <option value="General">General</option>
                                <option value="Sports">Sports</option>
                                <option value="News">News</option>
                                <option value="Movies">Movies</option>
                            </select>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" x-model="newChannelUrl" placeholder="لینکی پەخش (m3u8 یان iframe)" class="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500" />
                            <input type="file" id="channelImageInput" @change="handleImageUpload($event, 'new')" accept="image/*" class="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300 file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white cursor-pointer" />
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="isYtCheck" x-model="newChannelIsYt" class="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0" />
                            <label for="isYtCheck" class="text-xs text-slate-300">ئایا ئەمە لینکی یوتیوب/ایفرەیمە؟</label>
                        </div>
                        <button @click="addChannel()" class="login-btn w-full py-2.5 text-xs font-semibold">زیادکردنی کەناڵ</button>
                    </div>

                    <div class="space-y-3">
                        <h3 class="text-sm font-bold text-white">بەڕێوەبردنی کەناڵەکان</h3>
                        <div class="max-h-80 overflow-y-auto space-y-2 pr-2">
                            <template x-for="(channel, index) in channels" :key="index">
                                <div class="bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl flex flex-col gap-3">
                                    
                                    <div class="flex justify-between items-center" x-show="editingIndex !== index">
                                        <div class="flex items-center gap-3">
                                            <template x-if="channel.image">
                                                <img :src="channel.image" class="w-8 h-8 rounded object-cover shadow" />
                                            </template>
                                            <template x-if="!channel.image">
                                                <div class="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-white text-xs" x-text="channel.badge"></div>
                                            </template>
                                            <div>
                                                <span class="text-xs font-bold text-white block" x-text="channel.name"></span>
                                                <span class="text-[10px] text-indigo-400" x-text="channel.category"></span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1.5">
                                            <button @click="moveChannel(index, -1)" :disabled="index === 0" class="bg-slate-700/50 border border-slate-600 text-slate-300 px-2.5 py-1 rounded-lg text-xs hover:bg-slate-700 transition disabled:opacity-30">
                                                <i class="fa-solid fa-arrow-up"></i>
                                            </button>
                                            <button @click="moveChannel(index, 1)" :disabled="index === channels.length - 1" class="bg-slate-700/50 border border-slate-600 text-slate-300 px-2.5 py-1 rounded-lg text-xs hover:bg-slate-700 transition disabled:opacity-30">
                                                <i class="fa-solid fa-arrow-down"></i>
                                            </button>
                                            <button @click="startEdit(index)" class="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-lg text-xs hover:bg-indigo-500/20 transition">دەستکاری</button>
                                            <button @click="deleteChannel(index)" class="bg-red-500/10 border border-red-500/20 text-red-400 px-2.5 py-1 rounded-lg text-xs hover:bg-red-500/20 transition">سڕینەوە</button>
                                        </div>
                                    </div>

                                    <div x-show="editingIndex === index" class="space-y-3 bg-slate-900/80 p-3 rounded-lg border border-indigo-500/30" style="display: none;">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <input type="text" x-model="editName" placeholder="ناوی کەناڵ" class="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-xs text-white focus:outline-none focus:border-indigo-500" />
                                            <select x-model="editCategory" class="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-xs text-white focus:outline-none focus:border-indigo-500">
                                                <option value="General">General</option>
                                                <option value="Sports">Sports</option>
                                                <option value="News">News</option>
                                                <option value="Movies">Movies</option>
                                            </select>
                                        </div>
                                        <input type="text" x-model="editUrl" placeholder="لینکی پەخش" class="bg-slate-800 border border-slate-700 w-full px-3 py-1.5 rounded text-xs text-white focus:outline-none focus:border-indigo-500" />
                                        <div class="flex items-center justify-between">
                                            <input type="file" @change="handleImageUpload($event, 'edit')" accept="image/*" class="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-xs text-slate-300 cursor-pointer" />
                                            <div class="flex items-center gap-2">
                                                <input type="checkbox" :id="'editYt_' + index" x-model="editIsYt" class="rounded bg-slate-800 border-slate-700 text-indigo-600" />
                                                <label :for="'editYt_' + index" class="text-xs text-slate-300">یوتیوبە؟</label>
                                            </div>
                                        </div>
                                        <div class="flex justify-end gap-2">
                                            <button @click="cancelEdit()" class="bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs">پاشگەزبوونەوە</button>
                                            <button @click="saveEdit(index)" class="bg-indigo-600 text-white px-3 py-1 rounded text-xs font-semibold">پاشەکەوتکردن</button>
                                        </div>
                                    </div>

                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <nav class="bg-slate-900 border-t border-slate-800 py-3 px-6 flex justify-around items-center text-xs text-slate-400">
            <button @click="currentTab = 'livetv'" :class="currentTab === 'livetv' ? 'text-indigo-400' : 'hover:text-white'" class="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer"><i class="fa-solid fa-house text-lg"></i>Live TV</button>
            <a href="#" class="flex flex-col items-center gap-1 hover:text-white"><i class="fa-solid fa-film text-lg"></i>Movies</a>
            <a href="#" class="flex flex-col items-center gap-1 hover:text-white"><i class="fa-solid fa-tv text-lg"></i>Series</a>
            <a href="#" class="flex flex-col items-center gap-1 hover:text-white"><i class="fa-solid fa-user text-lg"></i>Profile</a>
            <button @click="currentTab = 'settings'" :class="currentTab === 'settings' ? 'text-indigo-400' : 'hover:text-white'" class="flex flex-col items-center gap-1 bg-transparent border-0 cursor-pointer"><i class="fa-solid fa-gear text-lg"></i>Settings</button>
        </nav>

    </div>

    <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>
    <script>
        videojs.options.html5 = { nativeAudioTracks: false, nativeVideoTracks: false };
        window.player = videojs('tvPlayer');
    </script>

</body>
</html>
