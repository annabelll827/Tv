<script>
    function novaApp() {
        return {
            currentTab: 'livetv',
            searchQuery: '',
            selectedCategory: 'All',
            categories: ['All', 'Sports', 'News', 'Movies', 'General', 'Kids', 'Islamic'],

            // Player State
            activeChannelName: '',
            isPlayingModal: false,
            isYoutube: false,
            youtubeUrl: '',
            currentStream: '',

            // Admin Modal State
            showAdminModal: false,
            isAdminUnlocked: false,
            adminInput: '',
            adminError: false,

            newChannelName: '',
            newChannelUrl: '',
            newChannelImage: '',
            newChannelIsYt: false,
            newChannelCategory: 'General',

            editingIndex: null,
            editName: '',
            editUrl: '',
            editImage: '',
            editIsYt: false,
            editCategory: 'General',

            // Channels list
            channels: [
                {
                    name: 'AVA Media',
                    url: btoa(encodeURIComponent('Https://live.kurdtips.uno/proxy.php?url=http%3A%2F%2Fhlspackager.akamaized.net%2Flive%2FDB%2FAVA_TV%2FHLS%2FAVA_TV-avc1_2500000%3D10002%2Cmp4a_128000%3D20000.m3u8&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Rudaw',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?url=https%3A%2F%2Flive.rudaw.net%2Fhls%2Frudaw-tv%2Fmaster.m3u8&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Kurdsat News',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?url=https%3A%2F%2Flive.kurdtips.uno%2Fproxy.php%3Furl%3Dhttp%253A%252F%252F123tv.pro%252Flive%252FaSKpxnSj%252FhhewYcb%252F113226.m3u8%26ext%3D.m3u8&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Kurdsat HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?url=https%3A%2F%2Fhlspackager.akamaized.net%2Flive%2FDB%2FKURDSAT_HD%2FHLS%2FKURDSAT_HD-avc1_2500000%3D10002%2Cmp4a_128000%3D20000.m3u8&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Gali Kurdistan',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?url=https%3A%2F%2Flive.host247.net%2Fgk%2Fgksat%2Fplaylist.m3u8&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Channel 8',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9saXZlLmNoYW5uZWw4LmNvbS9DaGFubmVsOC1LdXJkaXNoL3RyYWNrcy12NGExL21vbm8ubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Al Hadath',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9saXZlLmFsYXJhYml5YS5uZXQvYWxhcmFiaWFwdWJsaXNoL2FsaGFkYXRoLnNtaWwvYWxhcmFiaWFwdWJsaXNoL2FsaGFkYXRoXzEwODBwL2NodW5rcy5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Al Arabiya',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzc5NDc4Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Kurdistan TV',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly81YTNlZDdhNzJlZDRiLnN0cmVhbWxvY2submV0L2xpdmUvU01JTDpteVN0cmVhbS5zbWlsL2NodW5rbGlzdF93NzM1NjkzMjcxX2IxNzAwMDAwX3NsZW5nX3Q2NE1UQTRNSEE9Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Kurdmax HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjIxNjM0Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'Kurdmax Show',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzEyM3R2LnByby9saXZlL2FTS3B4blNqL2hoZXdZY2IvMjQ3NzAubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'Ava Sport',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuMTI3LWNsb3VkZnJvbnQueHl6L2xpdmUvYWViNGRmMjUyMi9kY2VlMzliNTUxLzE4NTg5ODcubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'NRT Sport',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuMTI3LWNsb3VkZnJvbnQueHl6L2xpdmUvYWViNGRmMjUyMi9kY2VlMzliNTUxLzE4NTg5ODUubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'Niga Movies',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuMTI3LWNsb3VkZnJvbnQueHl6L2xpdmUvYWViNGRmMjUyMi9kY2VlMzliNTUxLzE4NTg5NTEubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'Avar HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2F2cnN0cmVhbS5jb206MTkzNS9saXZlL0F2YXJUdi9wbGF5bGlzdC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Waar HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9saXZlLmt3aWttb3Rpb24uY29tL3dhYXJtZWRpYWxpdmUvd2Fhcm1lZGlhLnNtaWwvcGxheWxpc3QubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Kurdistan 24',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjIxNTI0Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'MBC 1',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MTAubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MBC 2',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDkubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MBC 3',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDghbmTN1OA&ext=.m3u8'.replace('hbmTN1OA','OTgyNDkwOA=='))),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'MBC 4',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDcubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MBC 5',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDYubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MBC Drama',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDQubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MBC Max',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzIyOTQxLWFyZ3VlZC5kbi00a290dC5jb20vbGl2ZS8yZDgwZDJlNjE1LzI3YTM4ZDM0NmIwZC85MjQ5MDAubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'Shams HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9zdHJlYW0uc2hhbXMudtvjaGxzLzAvc3RyZWFtLm0zdTg&ext=.m3u8'.replace('vjaGxzL','vL2hscy8='))),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'BBC Arabic',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMTEyODQubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'TRT Kurdi',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly90di10cnRrdXJkaS5tZWR5YS50cnQuY29tLnRyL21hc3Rlcl83MjAubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'RT Arabic',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzk1OC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Newline',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzEzMy5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'BBC News',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly92cy1obHMtcHVzaC13dy1saXZlLmFrYW1haXplZC5uZXQveD00L2k9dXJuOmJiYzpwaXBzOnNlcnZpY2U6YmJjX25ld3NfY2hhbm5lbF9oZC90PTM4ND/vPTd2MTQvYj01MDcwMDE2L21haW4ubTN1OA&ext=.m3u8'.replace('vPTd2MTQ','j1wdjE0'))),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Khak HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuMTI3LWNsb3VkZnJvbnQueHl6L2xpdmUvYWViNGRmMjUyMi9kY2VlMzliNTUxLzE4NTkwMjQubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Peshang HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9zdHJlYW0uZm9yY2Fyb28uY29tL3N0cmVhbS9obHMvZGVza3RvcC5tM3U4P2ZiY2xpZD1Jd1pYaDBiZ05oWlcwQ01URUFjM0owWXdaaGNIQmZhV1FQTkRNM05qSTJNekUyT1Rjek56ZzRBQUVlWXdsY05GSzg1WFFxb1lKYmJ6QVgxRE9KbVJyTnAydld5Ty1maEYydzlqQmJZUUcxNVBBUzVZS0JtR0VfYWVtX0I5b21mc2ZzVG9hWTZGZi1xTmp0OVE&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Reng Family',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2ZpbmE0LmNvbS9saXZlL2txbWJ0Zmg3eGcvMXVlY2diamRnNC82OTY2MC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'TSN',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDgxLm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'TSN 2',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDgyLm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'TSN 3',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDgzLm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'TSN 4',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDg0Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'TSN 5',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDg1Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'Cartoon Network Arabic',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2ZpbmE0LmNvbS9saXZlL2txbWJ0Zmg3eGcvMXVlY2diamRnNC80NzU3Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Cartoon Network UK',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3hrcmJwcGZqLm1uYnZjYy5jb20vbGl2ZS/GNUhUUFRBMi9NUkNaMkM2Vy8yOTEwMy5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Nickelodeon US',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzEyM3R2LnByby9saXZlL2FTS3B4blNqL2hoZXdZY2IvMTAyNzI5OS5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Nicktoons',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzEyM3R2LnByby9saXZlL2FTS3B4blNqL2hoZXdZY2IvMTAyNzI5Mi5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Disney',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovLzEyM3R2LnByby9saXZlL2FTS3B4blNqL2hoZXdZY2IvMTAyNzI5OC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Al Jazeera Documentary',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3ByZW1pdW1vcmcxMC5jb20vbGl2ZS9lY1M0M3VQei9lWnBwRnJaLzIyODE5Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Al Jazeera Arabic',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3ByZW1pdW1vcmcxMC5jb20vbGl2ZS9lY1M0M3VQei9lWnBwRnJaLzIzMDY0Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Niga Kids',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzI2My5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Fox News',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL3Byby5wcmluY2U0ay5jb206NzM1NS9saXZlL1BSMjEzMDU0NzI2ODEwLzM4MjY2MDc5MjcyMDIvMjM4NDE1Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Sky News Arabia',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzcxOS5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'MMN Movies',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuMTI3LWNsb3VkZnJvbnQueHl6L2xpdmUvYWViNGRmMjUyMi9kY2VlMzliNTUxLzE4NTg5NDgubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'MMN Drama',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzIxMy5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Movies'
                },
                {
                    name: 'Farmuda HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2FvdS5tYWdpY2xpdmUueHl6OjIwNTIvZ2V0LnBocD91c2VybmFtZT1hNzlLR3dQNSZwYXNzd29yZD11VzVIakNxJnR5cGU9bTN1X3BsdXM&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Zarok HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly96aW5kaWt1cm1hbmciLnphcm9rdHYuY29tLnRyL2hscy9zdHJlYW0ubTN1OA'.replace('cti','_rd'))),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Amozhgare HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9hcHAtbGl2ZS5vcmcvbGl2ZS8zMjY4MzM0Yi9pbmRleC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Islamic'
                },
                {
                    name: 'Afarin Kids',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly81ZGNhYmYwMjZiMTg4LnN0cmVhbWxvY2submV0L2FmYXJpblRWL2xpdmVzdHJlYW0vY2h1bmtsaXN0X3w2MzkyMjEzODEubTN1OA'.replace('f3w6','3w6'))),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Dang Quran',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cHM6Ly9saXZlMjAuYm96enR2LmNvbS9naWF0di9naWF0di1RdXJhbi9RdXJhbi9wbGF5bGlzdC5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Islamic'
                },
                {
                    name: 'Food Network',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL2xpbmUuaGljaGFtbWVkaW5hLmNvbS9saXZlLzY5ZTI4ZDQ0ZTQ4MDcvNTJjZTA2MDQwMS84NjI4NDYubTN1OA&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Hormazhyar Sport HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzk0NjI2Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Sports'
                },
                {
                    name: 'Hormazhyar Kids',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzkzNTY4Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Kurd Channel HD',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzE3NS5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Parwarday Hawler',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzgyNTM0Lm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Islamic'
                },
                {
                    name: 'Parwarday Slemani',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzgyNTMzLm0zdTg&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Islamic'
                },
                {
                    name: 'Afarin Bakhcha',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?stream=aHR0cDovL29uZTRrbGl2ZS54eXo6ODA4MC9saXZlL24wNVdBdTNkdEFmdGFkL00xb09sRFVqa1JLMTFqLzEwNy5tM3U4&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Kids'
                },
                {
                    name: 'Kirkuk TV',
                    url: btoa(encodeURIComponent('https://live.kirkuklive.live/hls/stream/index.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Kanal D',
                    url: btoa(encodeURIComponent('https://live.kurdtips.uno/proxy.php?url=https%3A%2F%2Fdemiroren.daioncdn.net%2Fkanald%2Fkanald.m3u8%3Fapp%3Dkanald_web%26ce%3D3&ext=.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'A TV',
                    url: btoa(encodeURIComponent('https://rnttwmjcin.turknet.ercdn.net/lcpmvefbyo/atv/atv.m3u8')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'TRT 1',
                    url: btoa(encodeURIComponent('https://tv-trt1.medya.trt.com.tr/master.m3u8')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Show TV',
                    url: btoa(encodeURIComponent('https://ciner.daioncdn.net/showtv/showtv.m3u8?ce=3&app=4bc856ef-4c68-4a94-bc87-37dfaaa66558&st=RBzhSuGauna0OGld-DJUVA&e=1664766175&tv=1')),
                    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Iqra TV',
                    url: btoa(encodeURIComponent('https://cd198.anystream.uk:9092/iqapp/iq6a7ktv/playlist.m3u8')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'Islamic'
                },
                {
                    name: 'Cira TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/CIRA_TV/HLS/CIRA_TV.m3u8?hdnea=exp=1785120874~acl=/live/DB/CIRA_TV/HLS/CIRA_TV.m3u8~hmac=d756e4eef487f007709235dd000c98578ae6206930fd9173a6bdba9a058ee7ed')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Sterk TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/STERK_TV/HLS/STERK_TV.m3u8?hdnea=exp=1785121088~acl=/live/DB/STERK_TV/HLS/STERK_TV.m3u8~hmac=aec96a6985e69c17fccaf5f3a7bde372f38b1855a4e783a904e26e683c166082')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Jin TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/JIN_TV/HLS/JIN_TV.m3u8?hdnea=exp=1785121171~acl=/live/DB/JIN_TV/HLS/JIN_TV.m3u8~hmac=879bcf2d607f060da86ac7912f3a97b9bb77f6711ba49b28f7afc7c4ea25cae3')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Rojava TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/JIN_TV/HLS/JIN_TV.m3u8?hdnea=exp=1785121214~acl=/live/DB/JIN_TV/HLS/JIN_TV.m3u8~hmac=1e12c9aa021dc8f85672d884dc52104fe0436449a928961e527767e2e0c1c13a')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                },
                {
                    name: 'Nuce TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/NU_TV/HLS/NU_TV.m3u8?hdnea=exp=1785121293~acl=/live/DB/NU_TV/HLS/NU_TV.m3u8~hmac=8c91909970b637ce0ff9ea271bf62d0f365e0fc917b89e55568ca56c9d9cafd2')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Media Haber',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/MEDYA_HABER/HLS/MEDYA_HABER.m3u8?hdnea=exp=1785121403~acl=/live/DB/MEDYA_HABER/HLS/MEDYA_HABER.m3u8~hmac=82c8a9eb8bcb7d314d0c6bf0bee244bd20e8fe6681616ef35ddd4f1e142f653d')),
                    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'News'
                },
                {
                    name: 'Ronahi TV',
                    url: btoa(encodeURIComponent('https://hlspackager.akamaized.net/live/DB/RONAHI_TV/HLS/RONAHI_TV.m3u8?hdnea=exp=1785121488~acl=/live/DB/RONAHI_TV/HLS/RONAHI_TV.m3u8~hmac=4c403d8490741f1596386afb3a8b247a90665c00df26285aae2eb81fa90f49b3')),
                    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=60',
                    isYt: false,
                    category: 'General'
                }
            ],
            isLoading: true,
            loadError: false,
            isSaving: false,

            encodeData(str) {
                try { return btoa(encodeURIComponent(str)); } catch(e) { return str; }
            },

            decodeData(str) {
                try { return decodeURIComponent(atob(str)); } catch(e) { return str; }
            },

            async init() {
                await this.loadChannels();
                try {
                    const res = await window.storage.get('admin_unlocked', false);
                    if (res && res.value === 'true') this.isAdminUnlocked = true;
                } catch (e) {}
            },

            async loadChannels() {
                this.isLoading = true;
                this.loadError = false;
                try {
                    const res = await window.storage.get('channels', true);
                    if (res && res.value) {
                        this.channels = JSON.parse(res.value);
                    } else {
                        await this.persistChannels();
                    }
                } catch (e) {
                } finally {
                    this.isLoading = false;
                }
            },

            async persistChannels() {
                this.isSaving = true;
                try {
                    const result = await window.storage.set('channels', JSON.stringify(this.channels), true);
                    if (!result) { this.loadError = true; }
                } catch (e) {
                    this.loadError = true;
                } finally {
                    this.isSaving = false;
                }
            },

            get filteredChannels() {
                return this.channels.filter(ch => {
                    const matchesSearch = ch.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                    const matchesCategory = this.selectedCategory === 'All' || (ch.category && ch.category === this.selectedCategory);
                    return matchesSearch && matchesCategory;
                });
            },

            openPlayer(channel) {
                this.activeChannelName = channel.name;
                this.isYoutube = channel.isYt;
                this.isPlayingModal = true;

                const rawUrl = this.decodeData(channel.url);

                if (channel.isYt) {
                    this.youtubeUrl = rawUrl;
                    if (window.player) window.player.pause();
                } else {
                    this.currentStream = rawUrl;
                    this.$nextTick(() => {
                        if (window.player) {
                            window.player.src({ src: rawUrl, type: 'application/x-mpegURL' });
                            window.player.load();
                            window.player.play().catch(e => console.log('Autoplay handled', e));
                        }
                    });
                }
            },

            closePlayer() {
                this.isPlayingModal = false;
                this.currentStream = '';
                this.youtubeUrl = '';
                if (window.player) window.player.pause();
            },

            async checkAdmin() {
                if (this.adminInput.trim() === 'PDK') {
                    this.isAdminUnlocked = true;
                    this.adminError = false;
                    this.showAdminModal = false;
                    this.adminInput = '';
                    this.currentTab = 'settings';
                    try { await window.storage.set('admin_unlocked', 'true', false); } catch (e) {}
                } else {
                    this.adminError = true;
                }
            },

            async lockAdmin() {
                this.isAdminUnlocked = false;
                this.adminInput = '';
                this.currentTab = 'livetv';
                try { await window.storage.delete('admin_unlocked', false); } catch (e) {}
            },

            handleImageUpload(event, type) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        if (type === 'new') this.newChannelImage = e.target.result;
                        else if (type === 'edit') this.editImage = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            },

            async addChannel() {
                if (!this.newChannelName || !this.newChannelUrl) return;

                const newCh = {
                    name: this.newChannelName,
                    url: this.encodeData(this.newChannelUrl.trim()),
                    image: this.newChannelImage || 'https://via.placeholder.com/300/1e293b/ffffff?text=' + encodeURIComponent(this.newChannelName),
                    isYt: this.newChannelIsYt,
                    category: this.newChannelCategory || 'General'
                };

                this.channels.push(newCh);
                await this.persistChannels();

                this.newChannelName = '';
                this.newChannelUrl = '';
                this.newChannelImage = '';
                this.newChannelIsYt = false;
                this.newChannelCategory = 'General';
                const imgInput = document.getElementById('channelImageInput');
                if (imgInput) imgInput.value = '';
            },

            startEdit(index) {
                this.editingIndex = index;
                const ch = this.channels[index];
                this.editName = ch.name;
                this.editUrl = this.decodeData(ch.url);
                this.editImage = ch.image || '';
                this.editIsYt = ch.isYt || false;
                this.editCategory = ch.category || 'General';
            },

            cancelEdit() {
                this.editingIndex = null;
            },

            async saveEdit(index) {
                if (!this.editName || !this.editUrl) return;
                this.channels[index] = {
                    name: this.editName,
                    url: this.encodeData(this.editUrl.trim()),
                    image: this.editImage || 'https://via.placeholder.com/300/1e293b/ffffff?text=' + encodeURIComponent(this.editName),
                    isYt: this.editIsYt,
                    category: this.editCategory
                };
                await this.persistChannels();
                this.cancelEdit();
            },

            async deleteChannel(index) {
                this.channels.splice(index, 1);
                await this.persistChannels();
            },

            async moveChannel(index, direction) {
                const newIndex = index + direction;
                if (newIndex < 0 || newIndex >= this.channels.length) return;
                const item = this.channels.splice(index, 1)[0];
                this.channels.splice(newIndex, 0, item);
                await this.persistChannels();
            }
        }
    }
</script>
