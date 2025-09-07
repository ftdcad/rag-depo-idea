import React, { useState, useEffect } from 'react';
import { 
  Save, Download, Upload, FileText, AlertCircle, CheckCircle, Copy, RefreshCw, 
  Plus, Settings, Database, Key, Users, Monitor, Play, Pause, Trash2, 
  Search, Filter, BarChart3, Shield, Cloud, HardDrive, Zap, Brain,
  Building, UserCheck, Globe, Link, Eye, EyeOff, Edit3, Layers
} from 'lucide-react';

interface AIInstance {
  id: string;
  name: string;
  department: string;
  description: string;
  status: 'active' | 'inactive' | 'deploying' | 'error';
  ragConfig: {
    knowledgeBase: string[];
    vectorDB: string;
    embeddingModel: string;
    chunkSize: number;
    overlap: number;
  };
  apiKeys: {
    llmProvider: string;
    llmKey: string;
    portalAPI: string;
    customAPIs: { [key: string]: string };
  };
  systemPrompt: string;
  portalAccess: string[];
  lastUpdated: string;
  metrics: {
    queries: number;
    accuracy: number;
    avgResponseTime: number;
    userSatisfaction: number;
  };
}

interface Department {
  id: string;
  name: string;
  color: string;
  icon: string;
  defaultAPIs: string[];
  defaultPrompt: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'instances' | 'knowledge' | 'settings'>('dashboard');
  const [aiInstances, setAIInstances] = useState<AIInstance[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAPIKeys, setShowAPIKeys] = useState<{[key: string]: boolean}>({});

  // Initialize with sample data
  useEffect(() => {
    const sampleDepartments: Department[] = [
      {
        id: 'claims',
        name: 'Claims Processing',
        color: 'bg-blue-500',
        icon: '📋',
        defaultAPIs: ['claims-db', 'policy-api', 'fraud-detection'],
        defaultPrompt: 'You are a specialized claims processing assistant with access to policy documents and claim histories...'
      },
      {
        id: 'underwriting',
        name: 'Underwriting',
        color: 'bg-green-500',
        icon: '🔍',
        defaultAPIs: ['risk-assessment', 'market-data', 'actuarial-db'],
        defaultPrompt: 'You are an underwriting specialist assistant focused on risk assessment and policy pricing...'
      },
      {
        id: 'customer-service',
        name: 'Customer Service',
        color: 'bg-purple-500',
        icon: '💬',
        defaultAPIs: ['customer-db', 'billing-api', 'policy-lookup'],
        defaultPrompt: 'You are a customer service assistant providing helpful and empathetic support...'
      },
      {
        id: 'legal',
        name: 'Legal & Compliance',
        color: 'bg-red-500',
        icon: '⚖️',
        defaultAPIs: ['regulation-db', 'case-law', 'compliance-tracker'],
        defaultPrompt: 'You are a legal compliance assistant with expertise in insurance regulations...'
      }
    ];

    const sampleAIs: AIInstance[] = [
      {
        id: 'claims-ai-1',
        name: 'Hurricane Claims Specialist',
        department: 'claims',
        description: 'Specialized AI for hurricane and weather-related claims processing',
        status: 'active',
        ragConfig: {
          knowledgeBase: ['hurricane-procedures', 'weather-claims-db', 'catastrophe-protocols'],
          vectorDB: 'pinecone-claims',
          embeddingModel: 'text-embedding-ada-002',
          chunkSize: 1000,
          overlap: 200
        },
        apiKeys: {
          llmProvider: 'openai',
          llmKey: 'sk-...hidden',
          portalAPI: 'ccs-portal-key-1',
          customAPIs: {
            'weather-service': 'weather-api-key-1',
            'satellite-imagery': 'sat-api-key-1'
          }
        },
        systemPrompt: 'You are a hurricane claims specialist with deep knowledge of catastrophic weather events...',
        portalAccess: ['claims-module', 'weather-data', 'adjuster-tools'],
        lastUpdated: '2024-01-15T10:30:00Z',
        metrics: {
          queries: 1247,
          accuracy: 94.2,
          avgResponseTime: 1.8,
          userSatisfaction: 4.6
        }
      },
      {
        id: 'underwriting-ai-1',
        name: 'Property Risk Analyzer',
        department: 'underwriting',
        description: 'AI for property risk assessment and premium calculations',
        status: 'active',
        ragConfig: {
          knowledgeBase: ['risk-models', 'property-data', 'market-trends'],
          vectorDB: 'chroma-underwriting',
          embeddingModel: 'text-embedding-ada-002',
          chunkSize: 800,
          overlap: 150
        },
        apiKeys: {
          llmProvider: 'anthropic',
          llmKey: 'sk-ant-...hidden',
          portalAPI: 'ccs-portal-key-2',
          customAPIs: {
            'property-records': 'prop-api-key-1',
            'credit-score': 'credit-api-key-1'
          }
        },
        systemPrompt: 'You are a property underwriting assistant specializing in risk assessment...',
        portalAccess: ['underwriting-module', 'risk-tools', 'pricing-engine'],
        lastUpdated: '2024-01-14T15:45:00Z',
        metrics: {
          queries: 856,
          accuracy: 97.1,
          avgResponseTime: 2.3,
          userSatisfaction: 4.8
        }
      }
    ];

    setDepartments(sampleDepartments);
    setAIInstances(sampleAIs);
  }, []);

  const filteredInstances = aiInstances.filter(instance => {
    const matchesSearch = instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instance.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || instance.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const toggleAPIKeyVisibility = (instanceId: string, keyType: string) => {
    setShowAPIKeys(prev => ({
      ...prev,
      [`${instanceId}-${keyType}`]: !prev[`${instanceId}-${keyType}`]
    }));
  };

  const getStatusColor = (status: AIInstance['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'deploying': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getDepartmentInfo = (deptId: string) => {
    return departments.find(d => d.id === deptId) || { name: deptId, color: 'bg-gray-500', icon: '🤖' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-blue-700" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CCS RAG Depot Manager</h1>
                <p className="text-sm text-gray-600">Multi-Department AI Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>New AI Instance</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'instances', name: 'AI Instances', icon: Brain },
              { id: 'knowledge', name: 'Knowledge Bases', icon: Database },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total AI Instances</p>
                    <p className="text-3xl font-bold text-gray-900">{aiInstances.length}</p>
                  </div>
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Instances</p>
                    <p className="text-3xl font-bold text-green-600">
                      {aiInstances.filter(ai => ai.status === 'active').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Departments</p>
                    <p className="text-3xl font-bold text-purple-600">{departments.length}</p>
                  </div>
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {aiInstances.length > 0 
                        ? (aiInstances.reduce((acc, ai) => acc + ai.metrics.userSatisfaction, 0) / aiInstances.length).toFixed(1)
                        : '0.0'
                      }
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Departments & AI Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {departments.map((dept) => {
                  const deptAIs = aiInstances.filter(ai => ai.department === dept.id);
                  const activeAIs = deptAIs.filter(ai => ai.status === 'active');
                  
                  return (
                    <div key={dept.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`${dept.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}>
                          {dept.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{dept.name}</h4>
                          <p className="text-sm text-gray-600">{deptAIs.length} AI instances</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active:</span>
                          <span className="text-green-600 font-medium">{activeAIs.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Inactive:</span>
                          <span className="text-gray-600">{deptAIs.length - activeAIs.length}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {aiInstances.slice(0, 5).map((instance) => (
                  <div key={instance.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${instance.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{instance.name}</p>
                        <p className="text-sm text-gray-600">{getDepartmentInfo(instance.department).name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{instance.metrics.queries} queries</p>
                      <p className="text-sm text-gray-600">Last updated: {new Date(instance.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Instances Tab */}
        {activeTab === 'instances' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search AI instances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Instances List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredInstances.map((instance) => {
                const deptInfo = getDepartmentInfo(instance.department);
                
                return (
                  <div key={instance.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`${deptInfo.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg`}>
                          {deptInfo.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{instance.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(instance.status)}`}>
                              {instance.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{instance.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Department: {deptInfo.name}</span>
                            <span>•</span>
                            <span>Updated: {new Date(instance.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        {instance.status === 'active' ? (
                          <button className="p-2 text-gray-400 hover:text-yellow-600 rounded-md hover:bg-yellow-50">
                            <Pause className="h-4 w-4" />
                          </button>
                        ) : (
                          <button className="p-2 text-gray-400 hover:text-green-600 rounded-md hover:bg-green-50">
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Metrics */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Performance Metrics
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Queries:</span>
                              <span className="font-medium">{instance.metrics.queries.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Accuracy:</span>
                              <span className="font-medium">{instance.metrics.accuracy}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Avg Response:</span>
                              <span className="font-medium">{instance.metrics.avgResponseTime}s</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Satisfaction:</span>
                              <span className="font-medium">{instance.metrics.userSatisfaction}/5.0</span>
                            </div>
                          </div>
                        </div>

                        {/* RAG Configuration */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            RAG Configuration
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Vector DB:</span>
                              <span className="ml-2 font-medium">{instance.ragConfig.vectorDB}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Embedding:</span>
                              <span className="ml-2 font-medium">{instance.ragConfig.embeddingModel}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Knowledge Bases:</span>
                              <div className="ml-2 mt-1">
                                {instance.ragConfig.knowledgeBase.map((kb, index) => (
                                  <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                                    {kb}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* API & Portal Access */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Key className="h-4 w-4 mr-2" />
                            API & Portal Access
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">LLM Provider:</span>
                              <span className="ml-2 font-medium">{instance.apiKeys.llmProvider}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">LLM Key:</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs">
                                  {showAPIKeys[`${instance.id}-llm`] ? instance.apiKeys.llmKey : '••••••••'}
                                </span>
                                <button
                                  onClick={() => toggleAPIKeyVisibility(instance.id, 'llm')}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {showAPIKeys[`${instance.id}-llm`] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                </button>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">Portal Access:</span>
                              <div className="ml-2 mt-1">
                                {instance.portalAccess.map((access, index) => (
                                  <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                                    {access}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredInstances.length === 0 && (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No AI instances found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filterDepartment !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first AI instance'
                  }
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create AI Instance</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Knowledge Bases Tab */}
        {activeTab === 'knowledge' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Knowledge Base Management</h3>
              <p className="text-gray-600 mb-4">Upload, manage, and organize knowledge bases for your AI instances</p>
              <div className="space-y-4">
                <button className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800">
                  <Upload className="h-4 w-4" />
                  <span>Upload Documents</span>
                </button>
                <div className="text-sm text-gray-500">
                  Coming soon: Document upload, vectorization status, embedding management
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Default Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Vector Database
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="pinecone">Pinecone</option>
                        <option value="chroma">Chroma</option>
                        <option value="weaviate">Weaviate</option>
                        <option value="qdrant">Qdrant</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Embedding Model
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="text-embedding-ada-002">OpenAI Ada-002</option>
                        <option value="text-embedding-3-small">OpenAI Embedding-3-Small</option>
                        <option value="text-embedding-3-large">OpenAI Embedding-3-Large</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Require API key encryption</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Enable audit logging</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Require approval for new AI instances</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Monitoring & Alerts</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Email alerts for AI instance failures</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Weekly performance reports</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">API usage threshold alerts</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800">
                  Save Settings
                </button>
              </div>
            </div>

            {/* Department Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`${dept.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}>
                          {dept.icon}
                        </div>
                        <h4 className="font-medium text-gray-900">{dept.name}</h4>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Default APIs: {dept.defaultAPIs.length}</p>
                      <p>Active AIs: {aiInstances.filter(ai => ai.department === dept.id && ai.status === 'active').length}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
                <Plus className="h-4 w-4" />
                <span>Add Department</span>
              </button>
            </div>
          </div>
        )}

        {/* Create Modal Placeholder */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New AI Instance</h2>
                <p className="text-gray-600 mb-4">
                  This feature is coming soon. You'll be able to create custom AI instances with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-6">
                  <li>Department-specific configuration</li>
                  <li>Custom RAG knowledge bases</li>
                  <li>API key management</li>
                  <li>Portal access controls</li>
                  <li>Performance monitoring setup</li>
                </ul>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;