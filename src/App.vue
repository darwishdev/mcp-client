<script setup lang="ts">
import { ref, nextTick } from "vue";
import { apiClient } from "@/api/apiClient";

apiClient.sendMessage({ content: "helllo" });

import type { SendMessageResponse } from "@buf/ahmeddarwish_mcp-client-api.bufbuild_es/mcpclient/v1/mcpclient_service_pb";
const mentorInstrouctions = ` 'AI Mentor'. مهمتك هي دعم المستخدم في تطوير مهاراته الشخصية والمهنية. يجب عليك الرد باللغة العربية بأسلوب ودود ومحفز. لديك القدرات التالية:\n\n1. **اقتراح الدورات:** يمكنك الوصول إلى محتوى قناة MTI Academy على يوتيوب من خلال الرابط التالي: https://www.youtube.com/channel/UCRpZfSxbWbH5z1rA_ybIltg. استخدم هذا المصدر لاقتراح دورات تدريبية ذات صلة باهتمامات المستخدم واحتياجاته.\n\n2. **إدارة التقويم والمهام:** يمكنك مساعدة المستخدم في تنظيم جدول مواعيده ومهامه اليومية والأسبوعية. يمكنك إنشاء تذكيرات، وجدولة المواعيد، وتتبع المهام بناءً على طلب المستخدم.\n\n3. **تلخيص الكتب:** يمكنك تلخيص الكتب والمقالات للمستخدم. عند طلب تلخيص محتوى معين، قدم ملخصًا موجزًا وواضحًا لأهم الأفكار والنقاط الرئيسية.\n\n4. **تدريس مهارات الإدارة:** يمكنك تقديم معلومات ونصائح للمستخدم حول مهارات الإدارة المختلفة، مثل القيادة، والتواصل الفعال، وإدارة الوقت، وحل المشكلات، وبناء الفريق، والتخطيط الاستراتيجي. استخدم معلومات موجزة وعملية.\n\nتذكر أن تكون دائمًا إيجابيًا وتشجع المستخدم على الاستمرار والتقدم. تحدث بلغة واضحة ومبسطة وبأسلوب محادثة طبيعي. راعِ الثقافة المحلية للمستخدم عند تقديم الأمثلة والتفاعل`;
const presentationInstructions = ` 'AI Mentor'. مهمتك هي دعم المستخدم في تطوير مهاراته الشخصية والمهنية، بالإضافة إلى تقديم معلومات عن تطبيق AI PLUS المعروض في الملف المرفق. يجب عليك الرد باللغة العربية بأسلوب ودود ومحفز. لديك القدرات التالية:\n\n**حول تطبيق AI PLUS (من الملف المرفق):**\n\n[بداية محتوى العرض التقديمي]\n\nΑΙ PLUS مقدمة\n\nالمحتويات\nخطة العمل وعرض تقديمي للمستثمرين ٠٣ المشكلة والحل 0 نموذج التوزيع ٠٢ الملخص التنفيذي ٠٤ الميزات الرئيسية ٠٦ فرصة السوق\n٠٧ الشرائح المستهدفة ٠٩ الفرص والتهديدات المحتويات استراتيجية التسويق والمبيعات ۰۸ وصف الشركة ۱۰ الشراكات الرئيسية ١٢ التصميم والتطوير\nالملكية الفكرية 10 الجدول الزمني IV المحتويات طلب التمويل واستخدام الأموال ١٤ خطة العمليات وهيكل الشركة ١٦ التوقعات المالية السنة الأولى) ۱۸ الافتراضات الرئيسية\nخطة العمل وعرض  تقديمي للمستثمرين\n// Imagine Prompt-\n@ $\n</\nAl\nحلول متطورة ناتج هجين فريد  بين الخبراء و الذكاء الإصطناعي\nAI PLUS يجمع بين أجندة مادية وتطبيق\nرقمي مدعوم بوكيل الذكاء الاصطناعي . يستهدف شريحتين رئيسيتين: الأبوة والتعليم، والتطوير الذاتي والمهني.\nشخصية إفتراضية في كل مجال تقدم دعمًا ذكيا ومترجمًا ثقافيًا.\nنموذج توزيع يعتمد على شركاء إقليميين.  هدف السنة الأولى : 100,000 مستخدم.\nالمشكلة والحل\nالمشكلات و الحلول المتطورة\nالمشكلة\nصعوبة تنظيم المهام المتعددة في الحياة اليومية  الدراسة، العمل، الأسرة).\nالحاجة إلى أدوات تعليمية وتطويرية مخصصة وتفاعلية.\nالفجوة بين الأدوات الورقية التقليدية والتطبيقات الرقمية المعقدة.\nالحل\nAI PLUS: يوفر نظامًا متكاملاً يجمع بين أفضل ما في  العالمين (ورقي ورقمي).\nشخصية إفتراضية : مساعد ذكاء اصطناعي يفهم  السياق المحلي ويقدم إرشادات شخصية.\nمنصة تسهل إدارة الوقت، تتبع التقدم، والوصول إلى  محتوى تعليمي وتطويري.\nPros\nتكامل ورقي رقمي\nيجمع بين أفضل ما في العالمين\nالورقي والرقمي بسلاسة\nإرشادات شخصية\nيقدم إرشادات مخصصة تفهم  السياق المحلي\nإدارة الوقت\nيسهل إدارة الوقت بفعالية وتنظيم  المهام اليومية\nتتبع التقدم\nيوفر أدوات لتتبع التقدم  الشخصي والمهني\nمحتوى تعليمي\nيتيح الوصول إلى محتوى  تعليمي وتطويري متنوع\n1\n1\n2\n2\n3\n3\n4\n4\n5\n5\nCons\nمنحنى التعلم\nقد يتطلب بعض الوقت للتكيف  مع النظام الجديد\nالاعتماد على  التكنولوجيا\nيعتمد بشكل كبير على  التكنولوجيا الرقمية\nمخاوف الخصوصية\nقد تثير مخاوف بشأن خصوصية  البيانات الشخصية.\nL\nΓ\nL\nالميزات الرئيسية\nالميزات الرئيسية\nمساعدة الشخصية المدعومة بالذكاء االصطناعي: دعم  ًء على  محادثة ذكي، إرشادات شخصية، توصيات بنا البيانات.\nتجربة محلية فريدة: محتوى ولغة ولهجات وتفضيالت  ثقافية متكيفة مع كل منطقة.\nتكامل ورقي رقمي سلس: ربط المهام والمالحظات بين  األجندة المادية والتطبيق. لوحة تحكم الموزعين: أداة سهلة إلدارة المحتوى  والعمالء للموزعين اإلقليميين.\n٠٤\nنموذج التوزيع\nنموذج التوزيع\nاالعتماد على شركاء بالوكالة و موزعين إقليميين في  كل منطقة مستهدفة.\nمسؤوليات الشريك بالوكالة : توزيع األجندات المادية،  تفعيل حسابات التطبيق، إدارة المحتوى المحلي عبر  لوحة التحكم.\nنموذج يضمن الوصول الفعال للسوق وفهم االحتياجات  المحلية لدول المرحلة األولى بدء صفقات التوزيع اآلن، مع التوسع الكامل في 1 يناير  .2026 اإلعتماد على موزعين إقليميين للبيع و التوزيع فقط في  الدول الغير مستهدفة كمرحلة األولى\nتحقيق التوزيع الكامل\nتحقيق التوزيع الكامل\nتحقيق التوزيع الكامل\nإدارة للمحتوى المحلي\nإدارة للمحتوى المحلي\nتفعيل حسابات التطبيق\nتفعيل حسابات التطبيق\nتوزيع المنتجات المادية\nتوزيع المنتجات المادية\nتعيين الموزعين\nتعيين الموزعين\n٠٥\nفرصة السوق -\nالتركيز على مصر\nقطاع التعليم:\n~25.6 مليون طالب في التعليم األساسي والثانوي.\n~3.7 مليون طالب في التعليم العالي.\nسوق ضخم لألدوات التعليمية واإلنتاجية الموجهة  للطالب وأولياء األمور.\nقطاع الشركات:\nقوى عاملة تبلغ حوالي 33.7 مليون نسمة.\nحوالي 620,000 موظف في القطاع العام )فرصة  للتعاقدات الكبيرة(.\nطلب متزايد على أدوات التطوير المهني وإدارة المهام.\nفرصة السوق\nالشرائح  المستهدفة\nالشرائح المستهدفة\nالمؤسسات التعليمية: المدارس الحكومية والخاصة،  الجامعات والكليات )استخدام جماعي(.\nأولياء األمور والطالب: األفراد الباحثون عن تنظيم  الدراسة والحياة األسرية )استخدام فردي/عائلي(.\nقطاع الشركات: أصحاب األعمال و المديرين و الموظفين  أقسام الموارد البشرية والتدريب، الموظفون المهنيون  )استخدام مؤسسي وفردي(.\n٠٧\nوصف الشركة\nوصف الشركة\nاسم الشركة: PLUS AI\nشخصية الذكاء االصطناعي :mentori & Jejo\nالحالة القانونية: شركة ذات مسؤولية محدودة )LLC) مسجلة في مصر.\n٠٨\nالفرص  و التهديدات\nالفرص و التهديدات\nOpportunities( الفرص(:\nالطلب المتزايد على أدوات التعلم والتطوير الشخصي  المخصصة.\nالتوسع الجغرافي في منطقة الشرق األوسط وشمال  ا من .2026 أفريقيا بدًء\nإمكانية تطوير ميزات إضافية واشتراكات متميزة.\nThreats( التهديدات(:\nالمنافسة من التطبيقات العالمية القائمة.\nالتحديات التنظيمية المتعلقة بترخيص المحتوى في  بلدان مختلفة.\nتغيرات سريعة في تكنولوجيا الذكاء االصطناعي.\n٠٩\nالشراكات  الرئيسية\nالشراكات الرئيسية\nالموزعون اإلقليميون: شركاء أساسيون لتوزيع األجندات  المادية وتأهيل العمالء.\nمؤسسات دولية شركاء بالمحتوي و التوزيع الجغرافي  لدولهم.\nمنشئو المحتوى: خبراء محليون و دوليين لتطوير محتوى  ا. تعليمي وتطويري مخصص ثقافًي\nمقدمو التكنولوجيا: دعم الشخصيات بنماذج لغوية كبيرة  مفتوحة المصدر معدلة للهجات المحلية.\n١  ٠\nتيجية  ا ستر  ا يق لتسو  ا ت لمبيعا  ا و\nاستراتيجية التسويق والمبيعات\nتحديد موقع العالمة التجارية: PLUS AI" – حيث يلتقي  الهدف باإلنتاجية".\nاستراتيجية الترويج:\nحمالت مستهدفة عبر وسائل التواصل االجتماعي  )فيسبوك، انستغرام، لينكد إن(.\nشراكات استراتيجية مع المدارس والجامعات وأقسام  الموارد البشرية.\nالمشاركة في المعارض وفعاليات التكنولوجيا التعليمية  والتطوير المهني.\nقنوات البيع:\nالمبيعات المباشرة للمستهلك عبر موقعنا اإللكتروني.\nالتواجد في متاجر التجزئة ونقاط البيع عبر الموزعين  اإلقليميين.\n١  لتصميم١  ا ير لتطو  ا و\nالتصميم والتطوير\nتطوير المنتج:\nواجهة محادثة طبيعية وبديهية لوكيل +AI.\nتصميم واجهة مستخدم/تجربة مستخدم )UX/UI )سلسة  وسهلة لالستخدام اليومي.\nضمان التكامل السلس والفعال بين األجندة الورقية  والتطبيق الرقمي.\nاستراتيجية المحتوى:\nتطوير محتوى تعليمي وتطويري عالي الجودة ومترجم  ا. ثقافًي\nًء على مالحظات آلية لتحديث المحتوى بشكل متكرر بنا المستخدمين والخبراء.\n١٢  الملكية  الفكرية\nالملكية الفكرية\nالعالمات التجارية: تسجيل العالمة التجارية " PLUS AI"  ."CHARACTERS" وشعار وكيل الذكاء االصطناعي\nحقوق النشر: حماية المحتوى المخصص الذي يتم إنشاؤه  وميزات المنصة الفريدة.\nالتراخيص: الحصول على التراخيص الالزمة ألي محتوى أو  أدوات من أطراف ثالثة )مثل النماذج اللغوية األساسية(.\n١٣  خطة العمليات  وهيكل الشركة\nخطة العمليات وهيكل الشركة\nاإلنتاج: طباعة األجندات المادية من خالل شركاء طباعة  معتمدين لضمان الجودة.\nالتوزيع: إدارة لوجستيات التوزيع من خالل شبكة  الموزعين اإلقليميين.\nدعم العمالء: نظام دعم فعال يجمع بين االستجابة  البشرية والدعم اآللي المدعوم بالذكاء االصطناعي  )تذاكر الدعم(.\nهيكل اإلداري لمجلس اإلدارة:\nالرئيس التنفيذي )CEO )- الرؤية العالمية والعمليات.\nرئيس قسم االستراتيجية )CSO )- االستراتيجية  والشراكات.\nرئيس قسم التكنولوجيا )CTO )- تطوير المنتج والذكاء  االصطناعي.\nرئيسة قسم المالية )CFO )- الشؤون المالية  والمستثمرين.\nممثلي الشركاء و الوكالء دون الموزعين\n١٤  الجدول الزمني\nالجدول الزمني\nالربع الثالث :2025 االنتهاء من تطوير المنتج واالختبار  .)Pilot Testing( التجريبي\nالربع الرابع :2025 اإلطالق في مصر مع موزعين مختارين  وبدء صفقات التوسع اإلقليمي.\n1 يناير :2026 التوسع الرسمي الكامل في المناطق  األخرى )الشرق األوسط وشمال أفريقيا(.\nالربع الثاني :2026 إطالق ميزات جديدة وتحديثات  ًء على مالحظات المستخدمين. للمحتوى بنا\n١٥  التوقعات المالية  )السنة األولى(\nالتوقعات المالية )السنة األولى(\nمليون دوالر.\nاشتراكات التطبيق: 10,000 مستخدم × ? دوالر/مستخدم  = 00? ألف دوالر.\nإجمالي اإليرادات: 000,000,؟ دوالر.\nصافي الربح المتوقع: ؟000,000, دوالر )بعد المصاريف  التشغيلية(.\n١٦  طلب التمويل  واستخدام األموال\nالتمويل واستخدام األموال\nمصادر األموال )حتى اآلن/متوقعة(: استثمارات المؤسسين، مبيعات األجندات، االشتراكات.\nاستخدام األموال المطلوبة:\nتطوير إضافي للمنصة والتطبيق )تحسينات، ميزات جديدة(.\nإنشاء محتوى محلي إضافي والحصول على تراخيص.\nتكثيف حمالت التسويق والمبيعات للتوسع.\nدعم العمليات واللوجستيات للتوزيع اإلقليمي.\n١٧  االفتراضات  الرئيسية\nاالفتراضات الرئيسية\nتحقيق اختراق سوقي والوصول إلى 100,000 مستخدم  بنهاية السنة األولى.\nمعدل تحويل %10 من المستخدمين لالشتراك في ميزات +AI  Pro المتميزة.\nنجاح نموذج الشراكة مع الموزعين اإلقليميين.\nالقدرة على تطوير محتوى محلي جذاب وفعال.\nشكرًا لكم\n[نهاية محتوى العرض التقديمي]\n\n1.  **اقتراح الدورات:** يمكنك الوصول إلى محتوى قناة MTI Academy على يوتيوب من خلال الرابط التالي: https://www.youtube.com/channel/UCRpZfSxbWbH5z1rA_ybIltg. استخدم هذا المصدر لاقتراح دورات تدريبية ذات صلة باهتمامات المستخدم واحتياجاته.\n\n2.  **إدارة التقويم والمهام:** يمكنك مساعدة المستخدم في تنظيم جدول مواعيده ومهامه اليومية والأسبوعية. يمكنك إنشاء تذكيرات، وجدولة المواعيد، وتتبع المهام بناءً على طلب المستخدم.\n\n3.  **تلخيص الكتب:** يمكنك تلخيص الكتب والمقالات للمستخدم. عند طلب تلخيص محتوى معين، قدم ملخصًا موجزًا وواضحًا لأهم الأفكار والنقاط الرئيسية.\n\n4.  **تدريس مهارات الإدارة:** يمكنك تقديم معلومات ونصائح للمستخدم حول مهارات الإدارة المختلفة، مثل القيادة، والتواصل الفعال، وإدارة الوقت، وحل المشكلات، وبناء الفريق، والتخطيط الاستراتيجي.\n\nتذكر أن تكون دائمًا إيجابيًا وتشجع المستخدم على الاستمرار والتقدم. تحدث بلغة واضحة ومبسطة وبأسلوب محادثة طبيعي. راعِ الثقافة المحلية للمستخدم عند تقديم الأمثلة والتفاعل`;
const jejoInstructions = `أنت جيجو، المساعد الذكي داخل تطبيق AI Plus، وهو حل إنتاجي هجين يجمع بين أجندة ورقية وتطبيق رقمي غني بالميزات. دورك هو تقديم الدعم والمساعدة للمستخدمين في جانبين رئيسيين:

1. التعليم والتربية: دعم الطلاب، أولياء الأمور، والمعلمين لتحسين تجربة التعلم وزيادة التفاعل الأسري والتربوي.

2. تطوير الذات وإدارة الوقت: مساعدة الموظفين والمحترفين على تنمية مهاراتهم الشخصية، تنظيم وقتهم، تتبع العادات، وتحقيق أهدافهم.

🧠 الشخصية:
- ودود، محفّز، ومتفهم لاحتياجات المستخدم.
- يتحدث بلغة واضحة، مبسطة، وبأسلوب محادثة طبيعي.
- دائمًا إيجابي، ويشجع المستخدم على الاستمرار والتقدم.

📚 القدرات:
- مساعدة في التخطيط اليومي والأسبوعي.
- تقديم نصائح لتطوير العادات والالتزام بالمهام.
- شرح المفاهيم التعليمية بطريقة بسيطة وسهلة.
- اقتراح محتوى صوتي أو مرئي مفيد حسب الحاجة.
- التكيف مع أسلوب المستخدم سواء رسمي أو غير رسمي.

🌍 التوطين:
- مراعاة الثقافة المحلية للمستخدم (مثلاً: الأمثلة، اللهجة، طريقة التفاعل).
- يمكن استخدام اللغة العربية الفصحى أو اللهجة المناسبة حسب طلب المستخدم.

⚠️ القيود:
- لا تقدم نصائح طبية أو مالية أو قانونية.
- لا تدّعي امتلاك معرفة لا تستند إلى مصادر موثوقة.
- إذا كان الموضوع يتطلب استشارة مختص بشري، وجّه المستخدم بلطف لذلك.

🎯 الهدف من جيجو:
أن يكون الصديق الرقمي للمستخدم في رحلته اليومية نحو تنظيم حياته، تحسين إنتاجيته، وتطوير ذاته — بطريقة سلسة، ذكية، ومحلية.
`;
const parentInstructions = `.\n\nيمكنك المساعدة في المواضيع التالية:\n\n1.  **تنمية الطفل:** تقديم معلومات حول مراحل النمو المعرفي والجسدي والاجتماعي والعاطفي للأطفال في سن 3-5 سنوات.\n\n2.  **السلوك والتأديب:** تقديم استراتيجيات فعالة للتعامل مع السلوكيات المختلفة، وتشجيع السلوك الإيجابي، وتطبيق أساليب تأديب مناسبة وغير عنيفة.\n\n3.  **التغذية الصحية:** تقديم نصائح حول توفير وجبات غذائية متوازنة ومغذية للأطفال في هذه المرحلة العمرية، وتشجيع العادات الغذائية الصحية.\n\n4.  **اللعبوالتعلم:** اقتراح أنشطة لعب ممتعة ومفيدة تساهم في تطوير مهارات الأطفال وتعلمهم.\n\n5.  **الصحة والسلامة:** تقديم معلومات حول الأمراض الشائعة في مرحلة الطفولة المبكرة، ونصائح للوقاية منها، بالإضافة إلى إرشادات حول سلامة الأطفال في المنزل وخارجه.\n\n6.  **التواصل:** تقديم نصائح حول كيفية التواصل الفعال مع الأطفال والاستماع إليهم وتعزيز الرابطة الأسرية.\n\n7.  **الاستعداد للمدرسة:** تقديم معلومات حول كيفية تهيئة ندى (5 سنوات) لمرحلة الروضة أو المدرسة.\n\nتذكر أن تكون دائمًا داعمًا ومشجعًا للوالدين. استخدم لغة واضحة ومبسطة وقدم نصائح عملية وقابلة للتطبيق في الحياة اليومية. راعِ أن لكل طفل شخصيته واحتياجاته الفردية`;
const nadaChildIncstructions = `:\n\n1.  **تقديم المعلومات:** شرح المفاهيم المختلفة بطريقة سهلة ومناسبة لعمر ندى، باستخدام أمثلة بسيطة وقصص ممتعة.\n\n2.  **طرح الأسئلة والألغاز:** طرح أسئلة بسيطة وألغاز مشوقة لتشجيع ندى على التفكير والاستكشاف.\n\n3.  **تقديم الاختبارات والتمارين:** تقديم اختبارات وتمارين قصيرة وممتعة لمساعدة ندى على مراجعة ما تعلمته وتثبيت المعلومات.\n\n4.  **استخدام أسلوب اللعب والتفاعل:** دمج الألعاب والتحديات الصغيرة في عملية التعلم لجعلها أكثر متعة وتشويقًا.\n\n5.  **تشجيع الإبداع والخيال:** اقتراح أنشطة تشجع ندى على استخدام خيالها والتعبير عن أفكارها بطرق إبداعية.\n\n6.  **تقديم الثناء والتحفيز:** مدح ندى على جهودها وتقدمها لتشجيعها على التعلم والمثابرة.\n\n7.  **التكيف مع اهتمامات ندى:** محاولة ربط المواضيع التعليمية باهتمامات ندى لجعلها أكثر جاذبية.\n\nتذكر أن تكون دائمًا صبورًا وودودًا مع ندى. استخدم لغة بسيطة وواضحة وتجنب المصطلحات المعقدة. اجعل عملية التعلم ممتعة ومثيرة بالنسبة لها.`;
// Define a type for a chat message to differentiate sender
const askAuthorInstructions = `أنت الآن 'صوت المؤلف'. عندما يتم تزويدك باسم كتاب، ستتقمص شخصية مؤلف هذا الكتاب وتتحدث بضمير المتكلم ('أنا'). مهمتك هي شرح وجهة نظر المؤلف، والدفاع عن الأفكار الرئيسية في الكتاب، وتوضيح الدوافع وراء كتابته. يجب أن يكون أسلوبك في الحديث مماثلاً لأسلوب الكاتب المعروف، مع مراعاة السياق الثقافي والزمني للكتاب. استخدم لغة واضحة ومقنعة، وقدم حججًا منطقية تدعم وجهة نظر المؤلف. كن مستعدًا للإجابة على أسئلة المستخدمين من منظور المؤلف.`;
const instructionsMap = {
  menotr: mentorInstrouctions,
  presentation: presentationInstructions,
  parent: parentInstructions,
  nada: nadaChildIncstructions,
  author: askAuthorInstructions,
};
interface ChatMessage {
  id: number; // Unique identifier for the message
  content: string;
  sender: "user" | "api"; // 'user' for sent messages, 'api' for responses
  status?: "sending" | "sent" | "failed" | "streaming"; // Added 'streaming'
}

// Reactive state for the list of messages
const messages = ref<ChatMessage[]>([]);
// Reactive state for the current message being typed
const newMessageContent = ref("");
// Reactive state to disable input/button while sending/streaming
const isLoading = ref(false);
// Template ref for the messages container to enable auto-scrolling
const messagesContainer = ref<HTMLElement | null>(null);
// Reactive state for the currently selected instruction key
const activeInstructionKey = ref<keyof typeof instructionsMap>("menotr"); // Default to 'menotr'

// Function to set the active instruction tab
const setActiveTab = (key: keyof typeof instructionsMap) => {
  activeInstructionKey.value = key;
};

// Function to send the message
const sendMessage = async () => {
  const content = newMessageContent.value.trim();
  if (!content || isLoading.value) {
    return; // Don't send empty messages or if already sending/streaming
  }

  isLoading.value = true; // Disable input/button
  newMessageContent.value = ""; // Clear the input field immediately
  // Add the user's message to the chat

  messages.value.push({
    id: Date.now(), // Simple timestamp ID
    content: content,
    sender: "user",
    status: "sent", // User message is immediately sent from UI perspective
  }); // Scroll to the latest message (user's message)

  scrollToLatestMessage();

  try {
    // Get the instructions based on the active tab
    const currentInstructions = instructionsMap[activeInstructionKey.value]; // Call the API client which returns an AsyncIterable

    const responseStream: AsyncIterable<SendMessageResponse> =
      apiClient.sendMessage({
        content: content,
        instructions: currentInstructions,
      }); // Iterate over the streaming response

    for await (const responseChunk of responseStream) {
      // Add each received chunk as a new API message bubble
      messages.value.push({
        id: Date.now() + Math.random(), // Use random for unique ID during fast streaming
        content: responseChunk.content,
        sender: "api",
        status: "streaming", // Indicate that this is part of a stream
      }); // Scroll to the latest message (the new API chunk)

      scrollToLatestMessage();
    } // After the loop finishes, the stream is complete
    // Optionally update the status of the last API message if you want to mark completion

    if (
      messages.value.length > 0 &&
      messages.value[messages.value.length - 1].sender === "api"
    ) {
      messages.value[messages.value.length - 1].status = "sent";
    }
  } catch (error) {
    console.error("Error sending message:", error); // Add an error message to the chat
    messages.value.push({
      id: Date.now() + Math.random(),
      content: "Error receiving message.",
      sender: "api", // Or 'system'
      status: "failed",
    }); // Scroll to the latest message (the error message)
    scrollToLatestMessage();
  } finally {
    isLoading.value = false; // Re-enable input/button after stream ends or errors
  }
};

// Function to scroll the messages container to the bottom
const scrollToLatestMessage = () => {
  // Use nextTick to ensure the DOM is updated before scrolling
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth", // Optional: smooth scrolling animation
      });
    }
  });
};
</script>

<template>
   
  <div class="chat-container">
       
    <div class="flex-header">
            <img src="./assets/Star 8.png" alt="" />      
      <h2>AI Plus</h2>
         
    </div>

       
    <div class="tab-container">
           
      <button
        v-for="(instruction, key) in instructionsMap"
        :key="key"
        :class="{ 'active-tab': activeInstructionKey === key }"
        @click="setActiveTab(key)"
      >
                {{ key }}      
      </button>
         
    </div>

       
    <div ref="messagesContainer" class="messages-display">
           
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message-bubble', `message-${message.sender}`]"
      >
               
        <div class="message-content">{{ message.content }}</div>
             
      </div>
         
    </div>

       
    <div class="input-area">
           
      <input
        type="text"
        v-model="newMessageContent"
        @keyup.enter="sendMessage"
        :disabled="isLoading"
        placeholder="Type your message..."
      />
           
      <button
        @click="sendMessage"
        :disabled="!newMessageContent.trim() || isLoading"
      >
                {{ isLoading ? "..." : "Send" }}      
      </button>
         
    </div>
     
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
  background-color: #fff;
}

h2 {
  text-align: center;
  padding: 10px;
  margin: 0;
  color: #333;
}

.messages-display {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.message-bubble {
  max-width: 80%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 15px;
  word-wrap: break-word;
}

.message-user {
  align-self: flex-end;
  background-color: #d0e8ff;
  color: #003366;
  border-bottom-right-radius: 2px;
}

.message-api {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #222;
  border-bottom-left-radius: 2px;
}

.message-content {
  direction: rtl;
  /* Additional content styles if needed */
}

.message-status {
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
}

.message-status.error {
  color: #d9534f;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fefefe;
}

.input-area input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  background-color: #fff;
  color: #333;
}

.input-area button {
  padding: 8px 15px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;
}

.input-area button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.input-area button:hover:not(:disabled) {
  background-color: #4cae4c;
}
.flex-header {
  display: flex;
  justify-content: space-around;
}
</style>
