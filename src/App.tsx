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
  model: string;
  goal: string;
  instructions: string;
  documents: string;
  apiKey: string;
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
  const [editingInstance, setEditingInstance] = useState<AIInstance | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAPIKeys, setShowAPIKeys] = useState<{[key: string]: boolean}>({});

  // Form data for create/edit modal
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    model: 'gpt-4',
    goal: '',
    instructions: '',
    documents: '',
    apiKey: ''
  });

  const resetFormData = () => {
    setFormData({
      name: '',
      department: '',
      model: 'gpt-4',
      goal: '',
      instructions: '',
      documents: '',
      apiKey: ''
    });
  };

  const handleEdit = (instance: AIInstance) => {
    setEditingInstance(instance);
    setFormData({
      name: instance.name,
      department: instance.department,
      model: instance.model,
      goal: instance.goal,
      instructions: instance.instructions,
      documents: instance.documents,
      apiKey: instance.apiKey
    });
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingInstance(null);
    resetFormData();
  };

  const handleSaveInstance = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInstance) {
      // Update existing instance
      setAIInstances(prev => prev.map(instance => 
        instance.id === editingInstance.id 
          ? { 
              ...instance, 
              name: formData.name,
              department: formData.department,
              model: formData.model,
              goal: formData.goal,
              instructions: formData.instructions,
              documents: formData.documents,
              apiKey: formData.apiKey,
              lastUpdated: new Date().toISOString() 
            }
          : instance
      ));
    } else {
      // Create new instance
      const newInstance: AIInstance = {
        id: `ai-${Date.now()}`,
        name: formData.name,
        department: formData.department,
        description: formData.goal,
        status: 'inactive',
        model: formData.model,
        goal: formData.goal,
        instructions: formData.instructions,
        documents: formData.documents,
        apiKey: formData.apiKey,
        ragConfig: {
          knowledgeBase: [],
          vectorDB: 'pinecone',
          embeddingModel: 'text-embedding-ada-002',
          chunkSize: 1000,
          overlap: 200
        },
        apiKeys: {
          llmProvider: formData.model,
          llmKey: formData.apiKey,
          portalAPI: '',
          customAPIs: {}
        },
        systemPrompt: formData.instructions,
        portalAccess: [],
        lastUpdated: new Date().toISOString(),
        metrics: {
          queries: 0,
          accuracy: 0,
          avgResponseTime: 0,
          userSatisfaction: 0
        }
      };
      setAIInstances(prev => [...prev, newInstance]);
    }
    
    handleCloseModal();
  };

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
        model: 'gpt-4',
        goal: 'Process hurricane and weather-related claims efficiently',
        instructions: 'You are a hurricane claims specialist with deep knowledge of catastrophic weather events...',
        documents: 'hurricane-procedures.pdf, weather-claims-db.json, catastrophe-protocols.docx',
        apiKey: 'sk-...hidden',
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
                          <p className="text-gray-600 mb-2">{instance.goal}</p>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p><strong>Model:</strong> {instance.model}</p>
                            <p><strong>Department:</strong> {deptInfo.name}</p>
                            <p><strong>Documents:</strong> {instance.documents}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(instance)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Instructions Preview */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        {instance.instructions.substring(0, 200)}
                        {instance.instructions.length > 200 && '...'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredInstances.length === 0 && (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No AI instances found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first AI instance</p>
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
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Configure system settings and preferences</p>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {editingInstance ? 'Edit AI Instance' : 'Create New AI Instance'}
                </h2>
                
                <form onSubmit={handleSaveInstance} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Hurricane Claims Specialist"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department *
                      </label>
                      <select
                        required
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <select
                      required
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="claude-3">Claude 3</option>
                      <option value="gemini-pro">Gemini Pro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal/Purpose *
                    </label>
                    <textarea
                      required
                      value={formData.goal}
                      onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What is this AI supposed to do? e.g., Process hurricane and weather-related claims efficiently"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructions/System Prompt *
                    </label>
                    <textarea
                      required
                      value={formData.instructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                      rows={6}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter the system prompt/instructions for this AI..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Documents/Knowledge Base
                    </label>
                    <textarea
                      value={formData.documents}
                      onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.value }))}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="List the documents this AI needs, e.g., hurricane-procedures.pdf, weather-claims-db.json, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="text"
                      value={formData.apiKey}
                      onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter API key if available"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
                    >
                      {editingInstance ? 'Update AI' : 'Save AI'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;